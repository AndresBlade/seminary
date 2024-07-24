import DataContent from './DataContent'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import UseGet from '../../../shared/hooks/useGet'
import FormCSS from '../styles/FormCSS.module.css'
import { TitleForm } from './small_components/TitleForm'
import { InputForm } from './small_components/InputForm'
import { SelectForm } from './small_components/SelectForm'
import deleteIcon from '../../../assets/deleteIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../login/context/AuthContext'
import { DeleteUser } from '../helpers/DeleteUser'
import { GetUsers } from '../helpers/GetUsers'
import { useNavigate } from 'react-router-dom'
import { GetUserByType } from '../helpers/GetUserByType'
import { GetUserFind } from '../helpers/GetUserFind'
export interface userProps{
  person:{
      id:string
      forename:string
      surname:string
  }
  seminarian:{
    status:string
  } | null

  professor:{
    status_id:number
    instructor:{
      status:number | null
      instructor_position: string | null
    }
  } | null
}

export const ShowDataContent = () => {
  const apiUrl = 'http://127.0.0.1:3000/user/'
  const {data,error, setData}=UseGet<userProps[] | undefined>(apiUrl)
  const [userDelete,setUserDelete] = useState<string>('');
  const [infoUserDelete, setInfoUserDelete] = useState<string | undefined>(undefined);
  const [userFind, setUserFind] = useState<string>('');
  const [dataUserFind, setDataUserFind] = useState<string>('')
  const [typeUserUpdate, setTypeUserUpdate]= useState<string>('')
	const [getUserByType,setGetUserByType]=useState<string>('')
  const {user} = useContext(AuthContext);
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!user) return

    if(userDelete.length > 0 && infoUserDelete === 'Seminarista'){
      DeleteUser({id:userDelete,token:user.token,url:'seminarian'}).then(()=>{
        alert('eliminado correctamente')
      }).catch(error => alert('Error al eliminar'+ error))
    }
    if(userDelete.length > 0 && (infoUserDelete === 'Profesor' || infoUserDelete === 'Formador')){
      DeleteUser({id:userDelete,token:user.token,url:'professor'}).then(()=>{
        alert('eliminado correctamente')
      }).catch(error => alert('Error al eliminar'+ error))
    }
    if(getUserByType === 'all' || !userFind)
    { GetUsers(user.token).then(users => setData(users)).catch((error)=>{
      return (
        console.log(error),
        alert('Error al listar los datos')
      )
    })}
    if(getUserByType === 'seminarian' || getUserByType === 'professor'){
      GetUserByType({typeUser:getUserByType,token:user.token}).then(users => setData(users)).catch((error)=>{
        alert('Error al buscar usuarios por tipo' +error),
        console.log(error)
      })
      return;
    }
    if(dataUserFind){
      GetUserFind({data:dataUserFind, token:user.token}).then((response)=>{
        if(response.user){
          setData([response.user])
        }else{
          throw new Error()
        }
      }).catch(()=>{
        alert('No hay datos')
        console.log(Error)
      });
      setDataUserFind('');
      return;
    }
  },[infoUserDelete,userDelete,user,setData,getUserByType,userFind,dataUserFind])

  console.log(
    
  )
  return (
    <ContentContainer>
      <TitleForm title={'Lista de usuarios'}/>
      <div className={FormCSS.showDataOptions}>
        <InputForm type='number' placeholder='Buscar por ID' value={userFind} onChange={(e)=>{
          setUserFind(e.target.value)
        }}/> 
        <SelectForm value={getUserByType} onChange={(e)=>{
          setGetUserByType(e.target.value)
        }}>
          <option value="all">Todos</option>
          <option value="seminarian">Seminarista</option>
          <option value="professor">Profesor</option>
        </SelectForm>
        <button type='button' onClick={()=>{
          setDataUserFind(userFind)
        }}>Buscar</button>
      </div>
      <div>
        <div className={FormCSS.showDataHeader}>
          <p>Cédula</p>
          <p>Nombre</p>
          <p>Tipo</p>
          <p>Rol</p>
          <p>Status</p>
          <p>Acciones</p>
        </div>
        <div className={FormCSS.showDataBody}>
          {
            error ? (
              <p>Error al cargar los datos ó no existen datos</p>
            ):
            data?.map((user)=>
              <DataContent key={user.person?.id}>
                <p>{user.person?.id}</p>
                <p>{user.person?.forename}</p>
                <p>{user.seminarian?.status == undefined && user.professor?.status_id == undefined ? 'N/A':
                user.seminarian?.status ? 'Seminarista' :
                user.professor?.status_id && user.professor?.instructor?.status === undefined ? 'Profesor' :
                user.professor?.instructor?.status ? 'Formador': 'N/A'
                }</p> 
                <p>{user.seminarian?.status == undefined && user.professor?.status_id == undefined ? 'N/A':
                user.seminarian?.status ? 'Seminarista' :
                user.professor?.status_id && user.professor?.instructor?.status === undefined ? 'Profesor' :
                user.professor?.instructor?.status  ? 'Formador': 'N/A'
                  }
                </p>
                <p className={FormCSS.showDataBodyStatus}>{user.professor?.status_id === 0 ? 'Retirado' : 
                    user.professor?.instructor?.status === 1 ? 'Activo' :
                    user.professor?.status_id === 1 ? 'Activo':
                    user.seminarian?.status
                  }</p>
                <div>
                  <button className={FormCSS.buttonActions} onClick={()=>{
                    const userType = user.seminarian?.status ? 'seminarian' :
                    user.professor?.status_id ? 'professor' : 'N/A'
                    navigate(
                      `../../Profesor/${userType}/${user.person?.id.slice(2)}`                  
                      )
            
                    }}><img src={editIcon} alt="" /></button>
                  <button className={FormCSS.buttonActions} onClick={(e)=>{
                    e.preventDefault()
                    setUserDelete(user.person.id)
                    setTypeUserUpdate(
                      user.seminarian?.status ? 'seminarista' :
                      user.professor?.status_id && user.professor?.instructor?.status === undefined ? 'profesor' :
                      user.professor?.instructor.status ? 'formador': 'N/A'
                  )
                    
                  }}><img src={deleteIcon} alt="" /></button>
                </div>
              </DataContent>
            )
          }
        </div>
      </div>
      

    </ContentContainer>
  )
}


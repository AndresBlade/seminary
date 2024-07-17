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
  const {data,error, setData}=UseGet<userProps[]>(apiUrl)
  const [userDelete,setUserDelete] = useState<string>('');
  const [infoUserDelete, setInfoUserDelete] = useState<string | undefined>(undefined);
  const [userFind, setUserFind] = useState<string>('');
  const [dataUserFind, setDataUserFind] = useState<string>('')
  const [typeUserUpdate, setTypeUserUpdate]= useState<string>('')
	const [getUserByType,setGetUserByType]=useState<string>('')
  const {user} = useContext(AuthContext);
  const navigate = useNavigate()
  

  console.log(infoUserDelete)
  console.log(userDelete)
  console.log(getUserByType)
  console.log(data)
  console.log(dataUserFind)

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
    if(getUserByType === 'all')
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
    }
    if(dataUserFind){
      GetUserFind({data:dataUserFind, token:user.token}).then((userInfo)=>{
        
        setData([userInfo.user])
      })
      .catch((error)=>{
        alert(error)
        console.log(error)
        setDataUserFind('')
      })
    }
      //

  },[infoUserDelete,userDelete,user,dataUserFind,setData,getUserByType])

  console.log(data)
  return (
    <ContentContainer>
      <TitleForm title={'Lista de usuarios'}/>
      <div className={FormCSS.showDataOptions}>
        <InputForm placeholder='Buscar por nombre' value={userFind} onChange={(e)=>{
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
              <p>Error al cargar los datos</p>
            ):
            data?.map((user)=>
              <DataContent key={user.person?.id}>
                <p>V-{user.person?.id}</p>
                <p>{user.person?.forename}</p>
                <p>{user.seminarian?.status == undefined && user.professor?.status_id == undefined ? 'N/A':
                user.seminarian?.status ? 'Seminarista' :
                user.professor?.status_id && user.professor?.instructor?.status === undefined ? 'Profesor' :
                user.professor?.instructor?.status  ? 'Formador': 'N/A'
                }</p> 
                <p>{user.professor?.instructor?.instructor_position === undefined ? 'N/A':
                    user.professor?.instructor?.instructor_position
                  }
                </p>
                <p className={FormCSS.showDataBodyStatus}>{user.professor?.status_id === 0 ? 'Retirado' :
                    user.professor?.instructor?.status === 1 ? 'Activo' :
                    user.seminarian?.status
                  }</p>
                <div>
                  <button className={FormCSS.buttonActions} onClick={()=>{
                    navigate(`../../Profesor/${user.person?.id}`)
                    {user.seminarian?.status == undefined && user.professor?.status_id == undefined ? setTypeUserUpdate('N/A'):
                      user.seminarian?.status ? setTypeUserUpdate('seminarista') :
                      user.professor?.status_id && user.professor?.instructor?.status === undefined ? setTypeUserUpdate('profesor') :
                      user.professor?.instructor?.status  ? setTypeUserUpdate('formador'): 'N/A'
                  }}}><img src={editIcon} alt="" /></button>
                  <button className={FormCSS.buttonActions} onClick={(e)=>{
                    e.preventDefault()
                    setUserDelete(user.person.id)
                    {
                      user.seminarian?.status === undefined && user.professor?.status_id && user.professor?.instructor?.status === undefined ? setInfoUserDelete('Profesor') :
                      user.seminarian?.status && user.professor?.status_id === undefined ? setInfoUserDelete('Seminarista') : user.professor?.instructor.status ? setInfoUserDelete('Formador') : setUserDelete('N/A')
                    }
                    
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


import DataContent from './DataContent'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import UseGet from '../../../shared/hooks/useGet'
import FormCSS from '../styles/FormCSS.module.css'
import { TitleForm } from './small_components/TitleForm'
import { InputForm } from './small_components/InputForm'
import { SelectForm } from './small_components/SelectForm'
import deleteIcon from '../../../assets/deleteIcon.svg'
import editIcon from '../../../assets/editIcon.svg'

interface userProps{
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
    }
  } | null
}

export const ShowDataContent = () => {
  const apiUrl = 'http://127.0.0.1:3000/user/'
  const {data,loading,error}=UseGet<userProps[]>(apiUrl)


  console.log(data)
  return (
    <ContentContainer>
      <TitleForm title={'Lista de usuarios'}/>
      <div className={FormCSS['showDataOptions']}>
        <InputForm placeholder='Buscar por nombre'/> 
        <SelectForm>
          <option value="seminarista">Seminarista</option>
          <option value="profesor">Profesor</option>
          <option value="formador">Formador</option>
        </SelectForm>
        <button>Buscar</button>
      </div>
      <div>
        <div className={FormCSS['showDataHeader']}>
          <p>Cédula</p>
          <p>Nombre</p>
          <p>Tipo</p>
          <p>Status</p>
          <p>Acciones</p>
        </div>
        <div className={FormCSS['showDataBody']}>
          {
            error ? (
              <p>Error al cargar los datos</p>
            ):
            data?.map((user)=>
              <DataContent key={user.person.id}>
                <p>V-{user.person.id}</p>
                <p>{user.person.forename}</p>
                <p>{user.seminarian?.status == undefined && user.professor?.status_id == undefined ? 'N/A':
                user.seminarian?.status ? 'Seminarista' :
                user.professor?.status_id && user.professor?.instructor?.status === undefined ? 'Profesor' :
                user.professor?.instructor.status  ? 'Formador': 'N/A'
                }</p> 
                <div>
                  <button className={FormCSS['buttonActions']}><img src={editIcon} alt="" /></button>
                  <button className={FormCSS['buttonActions']}><img src={deleteIcon} alt="" /></button>
                </div>
              </DataContent>
            )
            
          }
        </div>
      </div>
      

    </ContentContainer>
  )
}


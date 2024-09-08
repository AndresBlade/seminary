import { useContext, useEffect, useState } from "react"
import SchedulesCSS from '../styles/schedules.module.css'
import { InputForm } from "../../form/components/small_components/InputForm"
import { SelectForm } from "../../form/components/small_components/SelectForm"
import { TitleForm } from "../../form/components/small_components/TitleForm"
import { ContentContainer } from "../../ui/container/components/ContentContainer"
import { schedulesInterfaces } from "../interfaces/schedules"
import { CreateSchedule } from "../helpers/CreateSchedule"
import { AuthContext } from "../../login/context/AuthContext"
import { GetCourses } from "../helpers/GetCourses"

export const SchedulesCreate = () => {
    const {user} = useContext(AuthContext)
    const [courseId, setCourseId]=useState(0);
    const [link, setLink]=useState('');
    const [dataCourses,setDataCourses]=useState<schedulesInterfaces[] | null>(null)

    useEffect(()=>{
        if(!user?.token) return
        
        GetCourses(user?.token).then(response=>{
            return setDataCourses(response)
        }).catch(error=>{
            console.log(error)
            alert('Error al consultar la lista de cursos')
        }
        )
    },[])

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!user?.token)return
        if(!courseId || !link){
            alert('Faltan datos para enviar')
            return
        }
        CreateSchedule({id:courseId,link:link,token:user?.token}).then(response=>{
            if(response.ok){
                alert('Horario cargado correctamente');
                setCourseId(0);
                setLink('');
            }else{
                throw new Error
            }
        }).catch(error=>{
            console.log(error)
            alert('Error al cargar horario')
        })

    }

    return (
        <ContentContainer>
            <TitleForm title={""} />
            <form action="POST" onSubmit={handleSubmit}>
                <p>Seleccionar curso</p>
                <SelectForm value={courseId.toString()} onChange={(e)=>{
                    setCourseId(+e.target.value)
                }}>
                    <option value={0}>Seleccionar curso</option>
                    {dataCourses?.map(courses=>
                        <option key={courses.ID} value={courses.ID}>{courses.Curso}</option>
                    )}
                </SelectForm>
                <p>Link</p>
                <InputForm
                    type="text"
                    value={link}
                    onChange={(e)=>{
                        setLink(e.target.value)
                    }}
                />

                <div className={SchedulesCSS.buttonsContainer}>
                    <button type='button' className={SchedulesCSS.buttonCancel}
                        onClick={()=>{
                            setCourseId(0)
                            setLink('')
                        }}>
                        Cancelar
                    </button>
                    <button type='submit'
                        disabled={!courseId || !link}
                        className={SchedulesCSS.buttonSave}>
                        Guardar
                    </button>
                </div>
            </form>
            
        </ContentContainer>
    )
}


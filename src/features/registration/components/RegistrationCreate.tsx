import { ContentContainer } from "../../ui/container/components/ContentContainer"
import { SelectForm } from "../../form/components/small_components/SelectForm"
import { Title } from "../../ui/title/components/Title"
import { BackgroundColoredSubtitle } from "../../ui/title/components/BackgroundColoredSubtitle"
import registrationCSS from '../styles/registrationCSS.module.css'
import DataHeader from "./DataHeader"
import { DataContent } from "./DataContent"
import { Subject } from "./Subject"
import { useEffect, useState,useContext } from "react"
import { AuthContext } from "../../login/context/AuthContext"
import { GetSeminarianByStage } from "../helpers/GetSeminarianByStage"
import { GetSubjectBySeminarian } from "../helpers/GetSubjectBySeminarian"
import { AcademicTerm, SeminarianByStage, SubjectsProps, SubjectsSeminarian } from "../interfaces/interfaces"
import { CreateRegistration } from "../helpers/CreateRegistration"
import { GetAcademicTerm } from "../helpers/GetAcademicTerm"
import { Alert } from "./Alert"
import { Animation } from "../../../shared/animation/Animation"
const RegistrationCreate = () => {
    const {user} = useContext(AuthContext)
    const [stageSelected, setStageSelected]=useState('');
    const [seminarianSelected, setSeminarianSelected]=useState('');
    const [seminarianList, setSeminarianList]=useState<SeminarianByStage[]>([]);
    const [subjectsToList, setSubjectToList]=useState<SubjectsSeminarian | null>(null)
    const [subjectSelected, setSubjectSelected]=useState<SubjectsProps[]>([]);
    const [academicTermActive, setAcademicTermActive]=useState<AcademicTerm[]>([])
    const [isLoading, setIsloading]=useState(false)
    const [alertText, setAlertText]=useState<string | null>(null)
    const academicTermActiveToSend = academicTermActive
    ? academicTermActive
        .filter((academicTerm) => academicTerm.status === "ACTIVO")
        .map((academicTerm) => academicTerm.id)
    : [0];
    
    const courses = subjectsToList ? subjectsToList.course ? subjectsToList.course.map(course=>(
        course.subject
    )):[]:[];
    
    const subjectSelectedToSend = subjectSelected.map(subject=>{
        return subject.id
    })

    useEffect(()=>{
        if(alertText) setTimeout(()=>{
            setAlertText(null)
        },2000)
    },[alertText])

    useEffect(()=>{
        GetAcademicTerm().then(response=>{
            setAcademicTermActive(response);
        }).catch(error=>{
            console.error(error);
            alert('Error al traer periodo academico activo');
            
        })
    },[])
    useEffect(()=>{
        if(!user?.token)return
        if(stageSelected.length > 0){
            GetSeminarianByStage({stage:stageSelected, token:user?.token}).then(response=>{
                return setSeminarianList(response)
            }).catch(error=>{
                console.error(error)
                alert('Error al listar los seminarista de la etapa ' +stageSelected)
            })
        }
        
        if(seminarianSelected !== ''){
            setIsloading(true)
            GetSubjectBySeminarian({id:seminarianSelected,token:user.token}).then(response=>{
                console.log(response)
                setSubjectToList(response)
                setIsloading(false)
            }).catch(error=>{
                console.error(error),
                alert('Error al mostrar las materias')
            }
            );
        }
        if(stageSelected.length === 0){
            setSubjectSelected([])
            setTimeout(()=>{
                setSubjectToList(null)
            },500)
            setSeminarianList([])
            setSeminarianSelected('')
        }
    },[stageSelected,user?.token,seminarianSelected])

    console.log(academicTermActiveToSend)
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!user?.token) return
        if(!academicTermActiveToSend) return

        CreateRegistration({idSeminarian:seminarianSelected,subjects:subjectSelectedToSend,AcademicTerm:academicTermActiveToSend,token:user?.token}).then(response=>{
            if(response.ok){
                setAlertText('El seminarista fue inscrito correctamente')
                setTimeout(() => {
                    setSeminarianSelected(''),
                    setSubjectSelected([]),
                    setSubjectToList(null)
                }, 2000);
            }else{
                throw new Error();
            }
            
        }).catch(error=>{
            console.error(error);
            setTimeout(() => {
                setStageSelected(''),
                setSeminarianSelected(''),
                setSubjectSelected([]),
                setSubjectToList(null)
            }, 2000);
            alert('No se pudo registrar' + error)
        })
    }

    return (
        <div>
            <Title content={"Inscripción de seminarista"}/>
            <BackgroundColoredSubtitle content={"Académico"}/>

            <ContentContainer>
                <div className={registrationCSS.containerSearch}>
                    <SelectForm title="Etapa" onChange={(e)=>{
                        setStageSelected(e.target.value)
                    }}>
                        <option value="" selected>Etapa</option>
                        <option value="PROPEDEUTICO">Propedeutico</option>
                        <option value="DISCIPULAR">Discipular</option>
                        <option value="CONFIGURATIVA">Configurativa</option>
                    </SelectForm>
                    <SelectForm value={seminarianSelected} onChange={(e)=>{
                        setSeminarianSelected(e.target.value)
                    }}>
                        <option value="" selected>Seleccionar seminarista</option>
                        {seminarianList.map(seminarianList=>(
                                <option key={seminarianList.id} value={seminarianList.id}>{seminarianList.name + ' '+ seminarianList.surname+ ' ' + seminarianList.id}</option>
                            ))
                        }
                    </SelectForm>
                </div>
                <div className={registrationCSS.registerSubjectsContainer}>
                    <form action="POST" onSubmit={handleSubmit}>
                        <DataHeader>
                            <p className={registrationCSS.dataHeaderSubject}>Materias</p>    
                            <p>Seleccionar</p>
                        </DataHeader>        
                        <DataContent>
                            {isLoading ? <Animation></Animation>:
                            courses.length === 0 ? 
                                <div className={registrationCSS.textShowNoData}>
                                    <p >No hay datos</p>
                                </div>:              
                            courses?.map(subjects=>(
                                subjects.map(subject=>(
                                    <Subject key={subject.id} subjectName={subject.name} idSubject={subject.id}
                                    setSubjectSelected={setSubjectSelected}
                                    subjectSelect={subjectSelectedToSend}
                                    courses={courses}
                                    />
                                ))
                            ))}
                        </DataContent>
                        <div className={registrationCSS.buttonActions}>
                            <button className={registrationCSS.buttonCancel} onClick={(e)=>{
                                e.preventDefault()
                                setStageSelected('')
                                setSeminarianSelected('')
                                setSubjectSelected([])
                                setSubjectToList(null)
                            }}>Cancelar</button>
                            <button className={registrationCSS.buttonSave} type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </ContentContainer>

            {alertText &&  (
                <Alert textAlert={alertText} isSuccess={true}/>
            )}

        </div>
    )
}

export default RegistrationCreate

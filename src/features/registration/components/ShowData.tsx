import { DataContent } from "./DataContent"
import DataHeader from "./DataHeader"
import { Title } from "../../ui/title/components/Title"
import { BackgroundColoredSubtitle } from "../../ui/title/components/BackgroundColoredSubtitle"
import { ContentContainer } from "../../ui/container/components/ContentContainer"
import registrationCSS from "../styles/registrationCSS.module.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../login/context/AuthContext"
import {RegisteredSeminarian, SubjectsRegistered } from "../interfaces/interfaces"
import { GetAllRegistration } from "../helpers/GetAllRegistration"
import editIcon from "../../../assets/editIcon.svg"
import activeSubjectIcon from "../../../assets/MaterialSymbolsCheckCircleOutlineRounded.svg";
import desactiveSubjectIcon from "../../../assets/MaterialSymbolsCancelOutlineRounded.svg";
import Modal from "./Modal"
import { GetSubjectRegistered } from "../helpers/GetSubjectRegistered"
import { DeleteSubjectsRegistered } from "../helpers/DeleteSubjectRegistered"
import { ActiveSubject } from "../helpers/ActiveSubject"

export const ShowData = () => {
    const {user} = useContext(AuthContext)
    const [data, setData]=useState<RegisteredSeminarian[]>([]);
    const [modal, setModal]=useState(false);
    const [idSeminarian, setIdSeminarian]=useState('');
    const [subjectDelete, setSubjectDelete]=useState(0);
    const [showSubjectsRegistered,setShowSubjectsRegistered]=useState<SubjectsRegistered[]>([]);
    const [activeSubject, setActiveSubject]=useState(0);

    useEffect(()=>{      
        GetAllRegistration().then(response=>{
            setData(response)
        }).catch(error=>{
            alert('error al mostrar los seminaristas registrados')
            console.log(error)
        })
    },[])
    useEffect(()=>{
        if(!user?.token)return
        if(idSeminarian.length>0){
            GetSubjectRegistered(idSeminarian).then(response=>{
                setShowSubjectsRegistered(response)
                return
            }).catch(error=>{
                console.log(error)
                alert('error al traer las materias registradas del seminarista')
            })
        }
        if(subjectDelete !== 0){
            DeleteSubjectsRegistered({id:subjectDelete,token:user.token}).then(response=>{
                if(response.ok){
                    alert('Eliminado correctamente')
                    GetSubjectRegistered(idSeminarian).then(response=>{
                        setShowSubjectsRegistered(response)
                        return
                    }).catch(error=>{
                        console.log(error)
                        alert('error al traer las materias registradas del seminarista')
                    })
                    setSubjectDelete(0)
                }
            }).catch(error=>{
                console.log(error)
                alert('Error al eliminar')
                setSubjectDelete(0)
            })
        }
        if(activeSubject !== 0){
            ActiveSubject({id:activeSubject,token:user.token}).then(response=>{
                if(response.ok){
                    alert('Activada correctamente')
                    GetSubjectRegistered(idSeminarian).then(response=>{
                        setShowSubjectsRegistered(response)
                        return
                    }).catch(error=>{
                        console.log(error)
                        alert('error al traer las materias registradas del seminarista')
                    })
                    setActiveSubject(0)
                }
            }).catch(error=>{
                console.log(error)
                alert('Error al activar materia');
                setActiveSubject(0)
            })
        }
    },[idSeminarian,subjectDelete,activeSubject,user?.token]) 

    return (
        <div>
            <Title content={"Académico"}/>
            <BackgroundColoredSubtitle content={"Lista de seminaristas inscritos"}/>

            <ContentContainer>
                <div className={registrationCSS.showData}>
                    <DataHeader>
                        <p>Cédula</p>
                        <p>Nombre</p>
                        <p>Apellido</p>
                        <p>Etapa</p>
                        <p>Acciones</p>
                    </DataHeader>
                    <DataContent>
                        {data.map(seminarianRegistered=>(
                            <div key={seminarianRegistered.id} className={registrationCSS.showRegistered}>
                                <p>{seminarianRegistered.id}</p>
                                <p>{seminarianRegistered.name}</p>
                                <p>{seminarianRegistered.surname}</p>
                                <p>{seminarianRegistered.stage}</p>
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setIdSeminarian(seminarianRegistered.id)
                                    setModal(true)
                                }}><img src={editIcon} alt="Editar" /></button>
                            </div>
                        ))}
                    </DataContent>
                </div>
            </ContentContainer>

            {modal ? (
                <Modal text="Eliminar materia inscrita" setModal={setModal}>
                    {
                        showSubjectsRegistered.map(subjects=>
                            (
                                <div 
                                    key={subjects.subject.id} 
                                    className={registrationCSS.showSubjectsRegistered}
                                >
                                    <p>{subjects.subject.name}</p>
                                    {subjects.subject_status === 'CURSANDO' ?
                                        <button onClick={(e)=>{
                                            e.preventDefault()
                                            setSubjectDelete(subjects.enrollment_id)
                                        }}>
                                            <img src={desactiveSubjectIcon} alt="eliminar" />
                                        </button>
                                        :
                                        <button onClick={(e)=>[
                                            e.preventDefault(),
                                            setActiveSubject(subjects.enrollment_id)
                                        ]}>
                                            <img src={activeSubjectIcon} alt="" />
                                        </button>
                                    }
                                </div>
                            )
                        )    
                    }
                </Modal>
                ):
                null   
            }
        </div>
    )
}


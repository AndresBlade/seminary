import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { TitleForm } from './small_components/TitleForm'
import { positionInstructor, professionalInfo } from '../interfaces/Form'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { SelectForm } from './small_components/SelectForm'
import { GetPositionInstructor } from '../helpers/GetPositionInstructor'
import { AuthContext } from '../../login/context/AuthContext'

interface professionaInfoPropsForm{
    academicTraining:string
    linkTitle:string
    startingDate:string
    setProfessionalInfo: Dispatch<SetStateAction<professionalInfo>>
    rol:string
    instructorPosition:string
    id:string | undefined
}

export const ProfessionalCareer = ({academicTraining,linkTitle,startingDate,
    setProfessionalInfo,rol,instructorPosition,id}:professionaInfoPropsForm) => {
    
    const {user}=useContext(AuthContext)

    console.log(instructorPosition)
    const [positionInstructor,setPositionInstructor]=useState<positionInstructor | null>(null)

    useEffect(()=>{
        if(!user?.token) return
        GetPositionInstructor(user?.token).then((response)=>{
            return(
                setPositionInstructor(response)
            )
        }).catch((error)=>{
            alert(error)
        })
    },[user?.token])

    useEffect(()=>{
        if(positionInstructor === null)return

        setProfessionalInfo(e=>{
            return {...e, instructorPosition:Object.entries(positionInstructor).length > 0 || Object.entries(positionInstructor).length === 0 ?  instructorPosition ? instructorPosition : Object.entries(positionInstructor)[0][0] : Object.entries(positionInstructor)?.[0]?.[0]}
        })
    },[instructorPosition, positionInstructor, setProfessionalInfo])

    return (
        <div className={FormCSS.professionalCareer}>
            <TitleForm title={'Trayectoria profesional'} />

            <div className={FormCSS['']}>
                <LabelForm>Estudios realizados</LabelForm>
                <InputForm placeholder='ING informatica' type='text' value={academicTraining.toUpperCase()} onChange={(e)=>{
                    setProfessionalInfo((professional)=>{
                        return{...professional, academicTraining:e.target.value}
                    })
                }}/>
            </div>
            <div>
                <LabelForm>Enlace al titulo</LabelForm>
                <InputForm placeholder='http://googledrive/titulo' type='text' value={linkTitle} onChange={(e)=>{
                    setProfessionalInfo((professional)=>{
                        return{...professional, linkTitle:e.target.value}
                    })
                }}/>
            </div>
            {rol === 'formador' ? (
                <div className={FormCSS.professionalCareerTrainer}>
                    <div>
                        <LabelForm>Fecha de ordenacion</LabelForm>
                        <InputForm type='date' value={startingDate} onChange={(e)=>{
                            setProfessionalInfo((professional)=>{
                                return{...professional, startingDate:e.target.value}
                            })
                        
                        }}/>
                    </div>
                    <div>
                        <LabelForm>Cargo</LabelForm>
                        <SelectForm value={instructorPosition} onChange={(e)=>{
                            setProfessionalInfo((professional)=>{
                                return{...professional, instructorPosition:e.target.value}
                            })
                        
                        }}> 
                            {id && <option value={instructorPosition}>{instructorPosition}</option>
                            }
                            {
                                positionInstructor && Object.entries(positionInstructor).map((position)=>
                                    <option value={position[0]} key={position[1]}>{position[1]}</option>
                                )
                                
                            }
                        </SelectForm>
                    </div>
                </div>
                
            ): null
            }
        </div>

    )
}

import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { TitleForm } from './small_components/TitleForm'
import { professionalInfo } from '../interfaces/Form'
import { Dispatch, SetStateAction } from 'react'

interface professionaInfoPropsForm{
    academicTraining:string
    linkTitle:string
    startingDate:string
    setProfessionalInfo: Dispatch<SetStateAction<professionalInfo>>
    rol:string
}

export const ProfessionalCareer = ({academicTraining,linkTitle,startingDate,
    setProfessionalInfo,rol}:professionaInfoPropsForm) => {


    return (
        <div className={FormCSS['professionalCareer']}>
            <TitleForm title={'Trayectoria profesional'} />

            <div className={FormCSS['']}>
                <LabelForm>Estudios realizados</LabelForm>
                <InputForm type='text' value={academicTraining} onChange={(e)=>{
                    setProfessionalInfo((professional)=>{
                        return{...professional, academicTraining:e.target.value}
                    })
                }}/>
            </div>
            <div>
                <LabelForm>Enlace al titulo</LabelForm>
                <InputForm type='text' value={linkTitle} onChange={(e)=>{
                    setProfessionalInfo((professional)=>{
                        return{...professional, linkTitle:e.target.value}
                    })
                }}/>
            </div>
            {rol === 'formador' ? (
                <div className={FormCSS['professionalCareerTrainer']}>
                    <div>
                        <LabelForm>Fecha de ordenacion</LabelForm>
                        <InputForm type='date' value={startingDate} onChange={(e)=>{
                            setProfessionalInfo((professional)=>{
                                return{...professional, startingDate:e.target.value}
                            })
                        
                        }}/>
                    </div>
                </div>
                
            ): null
            }
        </div>
    )
}

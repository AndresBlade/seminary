import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { TitleForm } from './small_components/TitleForm'
import { professionalInfo } from '../interfaces/Form'
import { Dispatch, SetStateAction } from 'react'

interface professionaInfoPropsForm{
    academicTraining:string
    linkTitle:string
    ordinationDate:string
    ministryYears:string
    setProfessionalInfo: Dispatch<SetStateAction<professionalInfo>>
}

export const ProfessionalCareer = ({academicTraining,linkTitle,ordinationDate,ministryYears,
    setProfessionalInfo}:professionaInfoPropsForm) => {
    return (
        <div>
            <TitleForm title={'Trayectoria profesional'} />

            <LabelForm>Estudios realizados</LabelForm>
            <InputForm type='text' value={academicTraining} onChange={(e)=>{
                setProfessionalInfo((professional)=>{
                    return{...professional, academicTraining:e.target.value}
                })
            }}/>
            <LabelForm>Enlace al titulo</LabelForm>
            <InputForm type='text' value={linkTitle} onChange={(e)=>{
                setProfessionalInfo((professional)=>{
                    return{...professional, linkTitle:e.target.value}
                })
            }}/>
        
            <LabelForm>Fecha de ordenacion</LabelForm>
            <InputForm type='date' value={ordinationDate} onChange={(e)=>{
                setProfessionalInfo((professional)=>{
                    return{...professional, ordinationDate:e.target.value}
                })

            }}/>

            <LabelForm>Años de ministerio</LabelForm>
            <InputForm value={ministryYears} onChange={(e)=>{
                setProfessionalInfo((professional)=>{
                    return{...professional, ministryYears:e.target.value}
                })

            }}/>
        
        </div>
    )
}

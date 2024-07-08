import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { SelectForm } from './small_components/SelectForm'
import { TitleForm } from './small_components/TitleForm'
import {seminarianInfo} from '../interfaces/Form'

import { Dispatch, SetStateAction, useState } from 'react'

interface academicCareerPropsForm{
    academicTraining:string
    stage:string
    linkTitle:string
    diocese:string
    parish:string
    apostolates:string
    ministriesReceived:string
    condition:string
    status:string
    nameSeminaryExternal:string
    yearOfIncome:string
    setSeminarianInfo:Dispatch<SetStateAction<seminarianInfo>>
}


export const AcademicCareer = ({academicTraining,stage,linkTitle,diocese,parish,apostolates,     ministriesReceived,condition,status,nameSeminaryExternal,yearOfIncome,setSeminarianInfo}:academicCareerPropsForm) => {
    const [anotherSeminary, setAnotherSeminary]=useState(false)

    console.log(anotherSeminary)

    return (
        <div className={FormCSS['academicCareer']}>
            <TitleForm title={'Trayectoria académica'} />

            <div>
                <LabelForm>Formacion academica</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div>
                <LabelForm>Status</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div>
                <LabelForm>Enlace a titulo</LabelForm>
                <InputForm type='text'/>
            </div>

            <div>
                <LabelForm>Apostolados</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div>
                <LabelForm>Ministerios recibidos</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div>
                <LabelForm>Condición</LabelForm>
                <SelectForm></SelectForm>
            </div>
            
            <div>
                <LabelForm>Etapa</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div className={FormCSS['seminarianExternalContainer']} >
                <LabelForm>
                    ¿Proviene de otro seminario?
                </LabelForm>
                <div className={FormCSS['seminarianExternal']}>
                    <InputForm type='checkbox' id='anotherSeminary' onChange={(e)=>{
                        setAnotherSeminary(e.target.checked)
                    }}/>
                    <p>Sí, proviene de otro seminario.</p>
                </div>
            </div>
            {anotherSeminary ? (
                <div>
                    <div>
                        <LabelForm>Nombre del seminario donde proviene</LabelForm>
                        <InputForm type='text' onChange={(e)=>{
                            setSeminarianInfo((seminarian)=>{
                                return{...seminarian, nameSeminaryExternal:e.target.value}
                            })
                        }}/>
                    </div>

                    <div>
                        <LabelForm>Año al que ingresa</LabelForm>
                        <InputForm type='text' value={yearOfIncome} onChange={(e)=>{
                            setSeminarianInfo((seminarian)=>{
                                return{...seminarian, yearOfIncome:e.target.value}
                            })
                        }}/>
                    </div>
                </div>
                ):
                null    
            }
            
        </div>
    )
}


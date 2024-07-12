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
    apostolates:string
    ministriesReceived:string
    condition:string
    status:string
    nameSeminaryExternal:string
    yearOfIncome:string
    setSeminarianInfo:Dispatch<SetStateAction<seminarianInfo>>
    setAnotherSeminary:Dispatch<SetStateAction<boolean>>
    anotherSeminary:boolean
}


export const AcademicCareer = ({academicTraining,stage,linkTitle,apostolates,     ministriesReceived,condition,status,nameSeminaryExternal,yearOfIncome,setSeminarianInfo,setAnotherSeminary,anotherSeminary}:academicCareerPropsForm) => {

    console.log(nameSeminaryExternal)

    return (
        <div className={FormCSS['academicCareer']}>
            <TitleForm title={'Trayectoria académica'} />

            <div>
                <LabelForm>Formacion academica</LabelForm>
                <InputForm type='text' value={academicTraining} onChange={(e)=>{
                    setSeminarianInfo((seminarian)=>{
                        return {...seminarian, academicTraining:e.target.value}
                    })
                }} />
            </div>

            {/* <div>
                <LabelForm>Status</LabelForm>
                <SelectForm></SelectForm>
            </div> */}

            <div>
                <LabelForm>Enlace a titulo</LabelForm>
                <InputForm type='text' value={linkTitle} onChange={(e)=>{
                    setSeminarianInfo((seminarian)=>{
                        return{...seminarian, linkTitle:e.target.value}
                    })
                }}/>
            </div>

            <div>
                <LabelForm>Apostolados</LabelForm>
                <InputForm type='text' value={apostolates} onChange={(e)=>{
                    setSeminarianInfo((seminarian)=>{
                        return{...seminarian, apostolates:e.target.value}
                    })
                }}/>
            </div>

            {stage === '3' ? (
                    <div>
                        <LabelForm>Ministerios recibidos</LabelForm>
                        <SelectForm value={ministriesReceived} onChange={(e)=>{
                            setSeminarianInfo((seminarian)=>{
                                return{...seminarian, ministriesReceived:e.target.value}
                            })
                        }}>
                            <option value="Unkown">Unknow</option>
                            <option value="Admisión">Admisión</option>
                            <option value="Lectorado">Lectorado</option>
                            <option value="Acolitado">Acolitado</option>
                        </SelectForm>
                    </div>
                ):
                null
            }

            <div>
                <LabelForm>Condición</LabelForm>
                <SelectForm value={condition} onChange={(e)=>{
                            setSeminarianInfo((seminarian)=>{
                                return{...seminarian, condition:e.target.value}
                            })
                        }}>
                    <option value="Interno">Interno</option>
                    <option value="Externo">Externo</option>
                </SelectForm>
            </div>
            
            <div>
                <LabelForm>Etapa</LabelForm>
                <SelectForm value={stage} onChange={(e)=>{
                    setSeminarianInfo((seminarian)=>{
                        return{...seminarian, stage:e.target.value}
                    })
                }}>
                    <option value="1">PROPEDEUTICO</option>
                    <option value="2">DISCIPULADO</option>
                    <option value="3">CONFIGURATIVA</option>
                </SelectForm>
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
                <div className={FormCSS['anotherSeminary']}>
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


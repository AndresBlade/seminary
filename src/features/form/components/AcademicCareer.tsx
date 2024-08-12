import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { SelectForm } from './small_components/SelectForm'
import { TitleForm } from './small_components/TitleForm'
import {seminarianInfo} from '../interfaces/Form'
import { Dispatch, SetStateAction } from 'react'

interface academicCareerPropsForm{
    academicTraining?:string
    stage?:string
    linkTitle?:string
    apostolates:string
    ministriesReceived?:string
    condition:string
    status:string
    nameSeminaryExternal?:string
    yearOfIncome?:number
    setSeminarianInfo:Dispatch<SetStateAction<seminarianInfo>>
    setAnotherSeminary:Dispatch<SetStateAction<boolean>>
    anotherSeminary:boolean
    id?:string
}


export const AcademicCareer = ({academicTraining,stage,linkTitle,apostolates,     ministriesReceived,condition,status,nameSeminaryExternal,yearOfIncome,setSeminarianInfo,setAnotherSeminary,anotherSeminary,id}:academicCareerPropsForm) => {

    console.log(nameSeminaryExternal)
    if(nameSeminaryExternal === undefined) setAnotherSeminary(false)
    if(nameSeminaryExternal && nameSeminaryExternal?.length > 0) setAnotherSeminary(true)

    return (
        <div className={FormCSS.academicCareer}>
            <TitleForm title={'Trayectoria académica'} />

            <div>
                <LabelForm>Formacion academica</LabelForm>
                <InputForm type='text' value={academicTraining?.toLocaleUpperCase()} onChange={(e)=>{
                    setSeminarianInfo((seminarian)=>{
                        return {...seminarian, academicTraining:e.target.value}
                    })
                }} />
            </div>

            {id ? (  
                <div>
                    <LabelForm>Status</LabelForm>
                    <SelectForm value={status} onChange={(e)=>{
                        setSeminarianInfo((seminarian)=>{
                            return{...seminarian, status:e.target.value}
                        })
                    }}>
                        <option value="ACTIVO">Activo</option>
                        <option value="RETIRADO">Retirado</option>
                        <option value="PASTORAL">Año Pastoral</option>
                        <option value="CULMINADO">Culminado</option>


                    </SelectForm>
                </div> ): null
            }

            <div>
                <LabelForm>Enlace a titulo</LabelForm>
                <InputForm type='text' value={linkTitle?.toLocaleUpperCase()} onChange={(e)=>{
                    setSeminarianInfo((seminarian)=>{
                        return{...seminarian, linkTitle:e.target.value}
                    })
                }}/>
            </div>

            <div>
                <LabelForm>Apostolados</LabelForm>
                <InputForm type='text' value={apostolates.toLocaleUpperCase()} onChange={(e)=>{
                    setSeminarianInfo((seminarian)=>{
                        return{...seminarian, apostolates:e.target.value}
                    })
                }}/>
            </div>

            {!stage ? null :
            stage === 'CONFIGURATIVA' ? (
                    <div>
                        <LabelForm>Ministerios recibidos</LabelForm>
                        <SelectForm value={ministriesReceived} onChange={(e)=>{
                            setSeminarianInfo((seminarian)=>{
                                return{...seminarian, ministriesReceived:e.target.value}
                            })
                        }}>
                            <option value="UNKOWN">Unknow</option>
                            <option value="ADMISION">Admisión</option>
                            <option value="LECTORADO">Lectorado</option>
                            <option value="ACOLITADO">Acolitado</option>
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
                    <option value="INTERNO">Interno</option>
                    <option value="EXTERNO">Externo</option>
                </SelectForm>
            </div>
            
            <div>
                <LabelForm>Etapa</LabelForm>
                <SelectForm value={stage} onChange={(e)=>{
                    setSeminarianInfo((seminarian)=>{
                        return{...seminarian, stage:e.target.value}
                    })
                }}>
                    <option value="PROPEDEUTICO">PROPEDEUTICO</option>
                    <option value="DISCIPULADO">DISCIPULADO</option>
                    <option value="CONFIGURATIVA">CONFIGURATIVA</option>
                </SelectForm>
            </div>

            <div className={FormCSS.seminarianExternalContainer} >
                <LabelForm>
                    ¿Proviene de otro seminario?
                </LabelForm>
                <div className={FormCSS.seminarianExternal}>
                    <InputForm type='checkbox' id='anotherSeminary' checked={anotherSeminary} onChange={(e)=>{
                        setAnotherSeminary(e.target.checked)
                    }}/>
                    <p>Sí, proviene de otro seminario.</p>
                </div>
            </div>
            {anotherSeminary ? (
                <div className={FormCSS.anotherSeminary}>
                    <div>
                        <LabelForm>Nombre del seminario donde proviene</LabelForm>
                        <InputForm type='text' value={nameSeminaryExternal?.toLocaleUpperCase()} onChange={(e)=>{
                            setSeminarianInfo((seminarian)=>{
                                return{...seminarian, nameSeminaryExternal:e.target.value}
                            })
                        }}/>
                    </div>

                    <div>
                        <LabelForm>Año al que ingresa</LabelForm>
                        <InputForm type='number' value={yearOfIncome} id='yearOfIncome' onChange={(e)=>{
                            setSeminarianInfo((seminarian)=>{
                                return{...seminarian, yearOfIncome:parseInt(e.target.value)}
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


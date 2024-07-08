import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { SelectForm } from './small_components/SelectForm'
import { TitleForm } from './small_components/TitleForm'
import { Dispatch, SetStateAction } from 'react'
import { personalInfoProps } from '../interfaces/Form'

interface personalInfoPropsForm{
    name: string
    lastName: string
    id: string
    birthDate: string
    bloodType:string
    medicalRecord:string
    rol:string
    setPersonalInfo:Dispatch<SetStateAction<personalInfoProps>>
}


export const PersonalInfoForm = ({name,lastName,id,birthDate,bloodType,medicalRecord,rol,setPersonalInfo}:personalInfoPropsForm) => {
    return (
        <div className={FormCSS['personalInfo']}>
            <TitleForm title='Información General'/>
            
            <div>
                <LabelForm>Nombres</LabelForm>
                <InputForm type='text' id='name' value={name} onChange={(e)=>{
                    setPersonalInfo((personal)=>{
                            return{...personal, name:e.target.value}
                        })
                    }

                }/>
            </div>

            <div>
                <LabelForm>Apellidos</LabelForm>
                <InputForm type='text' id='lastName' value={lastName} onChange={(e)=>{
                    setPersonalInfo((personal)=>{
                            return{...personal, lastName:e.target.value}
                        })
                    }

                }/>
            </div>

            <div>
                <LabelForm>Cédula</LabelForm>
                <InputForm type='text' id='id' value={id} onChange={(e)=>{
                    setPersonalInfo((personal)=>{
                            return{...personal, id:e.target.value}
                        })
                    }

                }/>
            </div>

            <div>
                <LabelForm>Fecha de nacimiento</LabelForm>
                <InputForm type='date' id='date' value={birthDate} onChange={(e)=>{
                    setPersonalInfo((personal)=>{
                            return{...personal, birthDate:e.target.value}
                        })
                    }

                }/>
            </div>

            <div>
                <LabelForm>Diocesis</LabelForm>
                <SelectForm>

                </SelectForm>

            </div>

            <div>
                <LabelForm>Parroquia</LabelForm>
                <SelectForm>

                </SelectForm>

            </div>

            <div>
                <LabelForm>Rol de usuario</LabelForm>
                <SelectForm>
                    
                </SelectForm>
            </div>
        
        </div>
    )
}

import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import { InputForm } from '../../form/components/small_components/InputForm'
import { SelectForm } from '../../form/components/small_components/SelectForm'
import WorkerCSS from '../styles/WokerCSS.module.css'
import { personalInfoInterfaces } from '../interfaces/worker'
import { TitleForm } from '../../form/components/small_components/TitleForm'
import { blood } from '../../form/interfaces/Form'
import { AuthContext } from '../../login/context/AuthContext'
import { GetBlood } from '../../form/helpers/GetBlood'

interface WorkerPersonalInfoProps{
    forename:string
    surename:string
    id:string
    birthdate:string
    blood:string
    medicalRecord:string
    position:string
    setPersonalInfo:React.Dispatch<SetStateAction<personalInfoInterfaces>>
    setLetterId: React.Dispatch<SetStateAction<string>>
    letterId:string
}
const WorkerPersonalInfo = ({forename,surename,id,birthdate,blood,medicalRecord,setPersonalInfo,setLetterId,letterId,position}:WorkerPersonalInfoProps) => {
    const {user} = useContext(AuthContext)
    const [bloodList, setBloodList]=useState<blood | null>(null)

    useEffect(()=>{
        if(!user?.token)return
        GetBlood(user?.token).then(response=>{
            setBloodList(response)
        }).catch(error=>{
            console.log(error)
            alert('Error al mostrar los tipos de sangre')
        })
    },[])
    return (
        <div>
                
            <TitleForm title={'Información Personal'}/>
                
            <div className={WorkerCSS.personalInfoContainer}>
                <div>
                    <p>Nombres</p>
                    <InputForm
                        type='text'
                        value={forename}
                        onChange={(e)=>{
                            setPersonalInfo(info=>{
                                return {...info, forename:e.target.value.toUpperCase()}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Apellidos</p>
                    <InputForm
                        value={surename}
                        type='text'
                        onChange={(e)=>{
                            setPersonalInfo(info=>{
                                return {...info, surename:e.target.value.toUpperCase()}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Cedula</p>
                    <div className={WorkerCSS.idAndLetterIdContainer}>
                        <select value={letterId}
                            onChange={(e)=>{
                                setLetterId(e.target.value)
                            }}
                        >
                            <option value="V-">V-</option>
                            <option value="E-">E-</option>
                        </select>
                        <InputForm
                            value={id}
                            type='number'
                            onChange={(e)=>{
                                setPersonalInfo(info=>{
                                    return {...info, id:e.target.value}
                                })
                            }}
                        />
                    </div>
                    
                </div>
                <div>
                    <p>Fecha de nacimiento</p>
                    <InputForm
                        value={birthdate}
                        type='date'
                        onChange={(e)=>{
                            setPersonalInfo(info=>{
                                return {...info, birthdate:e.target.value}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Tipo de sangre</p>
                    <SelectForm 
                        value={blood}
                        onChange={(e)=>{
                            setPersonalInfo(info=>{
                                return {...info, blood:e.target.value}
                            })
                        }}
                    >
                        {bloodList && Object.entries(bloodList).map(blood=>
                            <option value={blood[0]} key={blood[1]}>
								{blood[0]}
							</option>
                            )
                        }
                    </SelectForm>
                </div>
                <div>
                    <p>Condicion medica</p>
                    <InputForm
                        value={medicalRecord}
                        type='text'
                        onChange={(e)=>{
                            setPersonalInfo(info=>{
                                return {...info, medicalRecord:e.target.value.toUpperCase()}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Cargo actual</p>
                    <SelectForm 
                        value={position}
                        onChange={(e)=>{
                            setPersonalInfo(info=>{
                                return{...info,position:e.target.value}
                            })
                        }}
                    >
                        <option value="Mantenimiento">MANTENIMIENTO</option>
                        <option value="Cocinero">COCINERO</option>
                        <option value="Transportista">TRANSPORTISTA</option>
                    </SelectForm>
                </div>
            </div>
            
        </div>
    )
}

export default WorkerPersonalInfo
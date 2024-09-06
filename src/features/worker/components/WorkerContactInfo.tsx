import React, { SetStateAction } from 'react'
import { contactInfoInterface } from '../interfaces/worker'
import { InputForm } from '../../form/components/small_components/InputForm'
import WorkerCSS from '../styles/WokerCSS.module.css'
import { TitleForm } from '../../form/components/small_components/TitleForm'
interface WorkerContactInfoProps{
    phoneNumber:string
    descriptionNumber:string
    phoneNumberFamily:string
    descriptionNumberFamily:string
    email:string
    setContactInfo:React.Dispatch<SetStateAction<contactInfoInterface>>
}
const WorkerContactInfo = ({phoneNumber,phoneNumberFamily,setContactInfo,descriptionNumberFamily,descriptionNumber,email}:WorkerContactInfoProps) => {
    return (
        <div>
            <TitleForm title={'Información de contacto'}/>
            <div className={WorkerCSS.contactInfoContainer}>
                <div>
                    <p>Telefono principal</p>
                    <InputForm 
                        value={phoneNumber}
                        type='number'
                        onChange={(e)=>{
                            setContactInfo(contact=>{
                                return{...contact,phoneNumber:e.target.value}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Descripción del Telefono</p>
                    <InputForm 
                        value={descriptionNumber}
                        type='text'
                        onChange={(e)=>{
                            setContactInfo(contact=>{
                                return{...contact,descriptionNumber:e.target.value.toUpperCase()}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Telefono familiar</p>
                    <InputForm 
                        value={phoneNumberFamily}
                        type='number'
                        onChange={(e)=>{
                            setContactInfo(contact=>{
                                return{...contact,phoneNumberFamily:e.target.value}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Descripción telefono familiar</p>
                    <InputForm 
                        value={descriptionNumberFamily}
                        type='text'
                        onChange={(e)=>{
                            setContactInfo(contact=>{
                                return{...contact,descriptionNumberFamily:e.target.value.toUpperCase()}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Correo electronico</p>
                    <InputForm 
                        value={email}
                        type='text'
                        onChange={(e)=>{
                            setContactInfo(contact=>{
                                return{...contact,email:e.target.value}
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default WorkerContactInfo

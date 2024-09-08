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
    function max_chars(e: React.ChangeEvent<HTMLInputElement>) {
		const max_chars = 11;
		if (e.target.value.length > max_chars) {
			e.target.value = e.target.value.substring(0, max_chars);
		}
	}
    return (
        <div>
            <TitleForm title={'Información de contacto'}/>
            <div className={WorkerCSS.contactInfoContainer}>
                <div>
                    <p>Telefono principal</p>
                    <InputForm
                        placeholder='00000000' 
                        value={phoneNumber}
                        type='number'
                        onChange={(e)=>{
                            max_chars(e)
                            setContactInfo(contact=>{
                                return{...contact,phoneNumber:e.target.value}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Descripción del Telefono</p>
                    <InputForm
                        placeholder='Mio'
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
                        placeholder='00000000'
                        value={phoneNumberFamily}
                        type='number'
                        onChange={(e)=>{
                            max_chars(e)
                            setContactInfo(contact=>{
                                return{...contact,phoneNumberFamily:e.target.value}
                            })
                        }}
                    />
                </div>
                <div>
                    <p>Descripción telefono familiar</p>
                    <InputForm 
                        placeholder='Tia'
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
                        placeholder='correo@correo.com'
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

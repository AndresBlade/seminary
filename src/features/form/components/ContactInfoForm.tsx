import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { TitleForm } from './small_components/TitleForm'
import {contactInfoProps} from '../interfaces/Form'
import React, { Dispatch, SetStateAction } from 'react'

interface contactInfoPropsForm{
    contactInfo:{
        phone:string
        phoneFamily:string
        description:string
        descriptionFamily:string
        email:string
    }
    setContactInfo:Dispatch<SetStateAction<contactInfoProps>>
}


export const ContactInfoForm = ({contactInfo:{phone,phoneFamily,description,descriptionFamily,email},setContactInfo}:contactInfoPropsForm) => {

    function max_chars(e:React.ChangeEvent<HTMLInputElement>){
        const max_chars = 11;
        if(e.target.value.length > max_chars){
            e.target.value = e.target.value.substring(0,max_chars)
        }
    }

    return (
        <div className={FormCSS.contactInfo} >
            <TitleForm title='Información de contacto' />
            <div>
                <LabelForm>Telefono Propio</LabelForm>
                <InputForm placeholder='000000000' type='number' id='phone' value={phone} onChange={(e)=>{
                    max_chars(e)
                    setContactInfo((contact)=>{
                        return{...contact,phone:e.target.value}

                    })
                    
                }}/>
            </div>
            <div>
                <LabelForm>Descripcion del telefono</LabelForm>
                <InputForm placeholder='Principal' type="text" id='descriptionPhone' value={description.toLocaleUpperCase()} onChange={(e)=>{
                    setContactInfo((contact)=>{
                        return{...contact, description:e.target.value}
                    })
                }} />
            </div>
            <div>
                <LabelForm>Correo Electronico</LabelForm>
                <InputForm placeholder='Correo@correo.com' type='email' id='email' value={email} onChange={(e)=>{
                    setContactInfo((contact)=>{
                        return{...contact,email:e.target.value}

                    })
                }}/>
            </div>

            <div>
                <LabelForm>Telefono de contacto familiar</LabelForm>
                <InputForm placeholder='000000000' type='number' id='phoneFamily' value={phoneFamily} onChange={(e)=>{
                    max_chars(e)
                    setContactInfo((contact)=>{
                        return{...contact,phoneFamily:e.target.value}
                    })
                }}/>
            </div>

            <div>
                <LabelForm>Nombre del contacto familiar</LabelForm>
                <InputForm placeholder='Tia' type='text' id='nameFamily' value={descriptionFamily.toLocaleUpperCase()} onChange={(e)=>{
                    setContactInfo((contact)=>{
                        return{...contact,descriptionFamily:e.target.value}
                    })
                }}/>
            </div>
        </div>
    )
}


import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { TitleForm } from './small_components/TitleForm'
import {contactInfoProps} from '../interfaces/Form'
import { Dispatch, SetStateAction } from 'react'

interface contactInfoPropsForm{
    contactInfo:{
        phone:string
        phoneFamily:string
        descriptionFamily:string
        email:string
    }
    setContactInfo:Dispatch<SetStateAction<contactInfoProps>>
}


export const ContactInfoForm = ({contactInfo:{phone,phoneFamily,descriptionFamily,email},setContactInfo}:contactInfoPropsForm) => {
    return (
        <div className={FormCSS['contactInfo']} >
            <TitleForm title='Información de contacto' />

            <div>
                <LabelForm>Telefono Propio</LabelForm>
                <InputForm type='text' id='phone' value={phone} onChange={(e)=>{
                    setContactInfo((contact)=>{
                        return{...contact,phone:e.target.value}

                    })
                }}/>
            </div>

            <div>
                <LabelForm>Correo Electronico</LabelForm>
                <InputForm type='text' id='email' value={email} onChange={(e)=>{
                    setContactInfo((contact)=>{
                        return{...contact,email:e.target.value}

                    })
                }}/>
            </div>

            <div>
                <LabelForm>Telefono de contacto familiar</LabelForm>
                <InputForm type='text' id='phoneFamily' value={phoneFamily} onChange={(e)=>{
                    setContactInfo((contact)=>{
                        return{...contact,phoneFamily:e.target.value}

                    })
                }}/>
            </div>

            <div>
                <LabelForm>Nombre del contacto familiar</LabelForm>
                <InputForm type='text' id='nameFamily' value={descriptionFamily} onChange={(e)=>{
                    setContactInfo((contact)=>{
                        return{...contact,descriptionFamily:e.target.value}

                    })
                }}/>
            </div>
        </div>
    )
}


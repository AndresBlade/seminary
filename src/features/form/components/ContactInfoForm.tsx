import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { TitleForm } from './small_components/TitleForm'

export const ContactInfoForm = () => {
    return (
        <div className={FormCSS['contactInfo']} >
            <TitleForm title='Información de contacto' />

            <div>
                <LabelForm>Telefono Propio</LabelForm>
                <InputForm type='text' id='phone'/>
            </div>

            <div>
                <LabelForm>Correo Electronico</LabelForm>
                <InputForm type='text' id='email'/>
            </div>

            <div>
                <LabelForm>Telefono de contacto familiar</LabelForm>
                <InputForm type='text' id='phoneFamily'/>
            </div>

            <div>
                <LabelForm>Nombre del contacto familiar</LabelForm>
                <InputForm type='text' id='nameFamily'/>
            </div>
        </div>
    )
}


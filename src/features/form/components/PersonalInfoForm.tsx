import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { SelectForm } from './small_components/SelectForm'
import { TitleForm } from './small_components/TitleForm'

export const PersonalInfoForm = () => {
    return (
        <div className={FormCSS['personalInfo']}>
            <TitleForm title='Información General'/>
            
            <div>
                <LabelForm>Nombres</LabelForm>
                <InputForm type='text' id='name'/>
            </div>

            <div>
                <LabelForm>Apellidos</LabelForm>
                <InputForm type='text' id='lastName'/>
            </div>

            <div>
                <LabelForm>Cédula</LabelForm>
                <InputForm type='text' id='id'/>
            </div>

            <div>
                <LabelForm>Fecha de nacimiento</LabelForm>
                <InputForm type='date' id='date'/>
            </div>

            <div>
                <LabelForm>Diocesis</LabelForm>
                <SelectForm></SelectForm>

            </div>

            <div>
                <LabelForm>Parroquia</LabelForm>
                <SelectForm></SelectForm>

            </div>

            <div>
                <LabelForm>Rol de usuario</LabelForm>
                <SelectForm></SelectForm>
            </div>
        
        </div>
    )
}

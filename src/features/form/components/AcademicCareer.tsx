import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { SelectForm } from './small_components/SelectForm'
import { TitleForm } from './small_components/TitleForm'
export const AcademicCareer = () => {
    return (
        <div className={FormCSS['academicCareer']}>
            <TitleForm title={'Trayectoria académica'} />

            <div>
                <LabelForm>Formacion academica</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div>
                <LabelForm>Status</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div>
                <LabelForm>Apostolados</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div>
                <LabelForm>Ministerios recibidos</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div>
                <LabelForm>Condición</LabelForm>
                <SelectForm></SelectForm>
            </div>
            
            <div>
                <LabelForm>Etapa</LabelForm>
                <SelectForm></SelectForm>
            </div>

            <div className={FormCSS['seminarianExternalContainer']} >
                <LabelForm>
                    ¿Proviene de otro seminario?
                </LabelForm>
                <div className={FormCSS['seminarianExternal']}>
                    <InputForm type='checkbox'/>
                    <p>Sí, proviene de otro seminario.</p>
                </div>
            </div>

            <div>
                <LabelForm>Nombre del seminario donde proviene</LabelForm>
                <InputForm type='text'/>
            </div>

            <div>
                <LabelForm>Año al que ingresa</LabelForm>
                <InputForm type='text'/>
            </div>
        </div>
    )
}


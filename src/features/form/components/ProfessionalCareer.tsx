import FormCSS from '../styles/FormCSS.module.css'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import { SelectForm } from './small_components/SelectForm'
import { TitleForm } from './small_components/TitleForm'

const ProfessionalCareer = () => {
    return (
        <div>
            <TitleForm title={'Trayectoria profesional'} />

            <LabelForm>Estudios realizados</LabelForm>
            <InputForm type='text'/>
            
            <LabelForm>Status</LabelForm>
            <SelectForm>

            </SelectForm>
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

        </div>
    )
}

export default ProfessionalCareer

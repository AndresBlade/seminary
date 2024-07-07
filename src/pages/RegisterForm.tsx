import ContentTitle from '../features/ui/contentTitle/components/ContentTitle'
import RegisterCreate from '../features/form/components/RegisterCreate'
import FormCSS from '../features/form/styles/FormCSS.module.css'

const RegisterForm = () => {
    return (
        <div className={FormCSS['registerForm']}>
            <ContentTitle title='Profesor' subtitle='Agregar Profesor'/>
            <RegisterCreate/>
        </div>
    )
}

export default RegisterForm

import LoginStyles from '../styles/login.module.css';
import LogoSeminario from '../../../assets/LogoSeminario.webp';
export const LoginImg = () => {
    return (
        <div className={LoginStyles['login-container__img']}>
                <img src={LogoSeminario} alt="Logo Seminario" className={LoginStyles['logo-img']}/>
                <h3 className={LoginStyles['login-h3']}>Seminario Divina Pastora</h3>
        </div>
    )
}

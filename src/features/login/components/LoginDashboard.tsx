import { useState } from 'react';
import LogoSeminario from '../../../assets/LogoSeminario.webp';
import LoginStyles from '../styles/login.module.css';
import { Link } from 'react-router-dom';
import LoginInputUser from '../../../assets/LoginInputUser.png';
import LoginInputPassword from '../../../assets/LoginInputLock.png';

const LoginDashboard = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    console.log(`Usuario: ${usuario} - Contraseña: ${password}`);

    return (
        <div className={LoginStyles['login-container']}>
            <div className={LoginStyles['login-container__img']}>
                <img src={LogoSeminario} alt="Logo Seminario" className={LoginStyles['logo-img']}/>
                <h3 className={LoginStyles['login-h3']}>Seminario Divina Pastora</h3>
            </div>
                <h2 className={LoginStyles['login-h2']}>Bienvenido!</h2>
            <div className={LoginStyles['login-container__form']}>
                <h1 className={LoginStyles['login-container__form__title']}>Iniciar Sesión</h1>
                <form action="POST" className={LoginStyles['login-container__form--login']}>
                    <div className={LoginStyles['login-container__user']}>
                        <img src={LoginInputUser} alt="Usuario" className={LoginStyles['login-input__img']}/>
                        <label htmlFor="username">Usuario</label>
                    </div>
                    <input type="text" id="username" name="username" className={LoginStyles['login-input__username']} placeholder='Cédula' onChange={(e)=>setUsuario(e.target.value)} />
                    <div className={LoginStyles['login-container__password']}>
                        <img src={LoginInputPassword} alt="Contraseña" className={LoginStyles['login-input__img']}/>
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    <input type="password" id="password" name="password" className={LoginStyles['login-input__password']} placeholder='Contraseña'onChange={(e)=>setPassword(e.target.value)}/>
                    <div className={LoginStyles['login-container__submit']}>
                        <input type="submit" value="Ingresar" className={LoginStyles['login-container__input-submit']} />
                    </div>
                    <Link to='/recuperar-contrasena' className={LoginStyles['login-container__form__forgot-password']}>¿Olvidaste tu contraseña?</Link>
                </form>
            </div>
        </div>
    )
}

export default LoginDashboard

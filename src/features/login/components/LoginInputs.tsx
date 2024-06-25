import React, { Dispatch } from 'react'
import LoginStyles from '../styles/login.module.css';
import LoginInputUser from '../../../assets/LoginInputUser.png';
import LoginInputPassword from '../../../assets/LoginInputLock.png';

interface LoginData{
    setUsuario : Dispatch<React.SetStateAction<string>>
    setPassword: Dispatch<React.SetStateAction<string>>
}

const LoginInputs = ({setUsuario,setPassword}:LoginData) => {
    return (
        <div>
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
        </div>
    )
}

export default LoginInputs

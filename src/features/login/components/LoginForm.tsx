import LoginStyles from '../styles/login.module.css';
import LoginInputs from './LoginInputs';
import { LoginUser } from '../helpers/LoginUser';
import { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface LoginFormProps{
    e: React.FormEvent<HTMLFormElement>,
    usuario:string,
    password:string
}

export const LoginForm = () => {
    const {setUser}= useContext(AuthContext);
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit=({e,usuario,password}:LoginFormProps)=>{
        e.preventDefault();
        if(usuario.length >= 8 && password.length >= 3){
            LoginUser({id:usuario,password:password}).then((response)=>{
                setUser(response)
                navigate('/home')
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
        }
        else{
            alert("Introduzca datos validos");
            return
        }
    }
    return (
        <div className={LoginStyles['login-container__form']}>
            <h1 className={LoginStyles['login-container__form__title']}>Iniciar Sesión</h1>
            <form action="POST" onSubmit={(e)=>{handleSubmit({e,usuario,password})}} className={LoginStyles['login-container__form--login']}>
                <LoginInputs
                    setUsuario={setUsuario}
                    setPassword={setPassword}
                />
                <div className={LoginStyles['login-container__submit']}>
                    <button type="submit" value="Ingresar" className={LoginStyles['login-container__input-submit']}>Ingresar</button>
                </div>
                <Link to='/recuperar-contrasena' className={LoginStyles['login-container__form__forgot-password']}>¿Olvidaste tu contraseña?</Link>
            </form>
        </div>
    )
}

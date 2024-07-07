import LoginStyles from '../styles/login.module.css';
import { LoginForm } from './LoginForm';
import { LoginImg } from './LoginImg';
const LoginDashboard = () => {

    return (
        <div className={LoginStyles['login-container']}>
            <LoginImg/>
            <LoginForm
            />
        </div>
    )
}

export default LoginDashboard

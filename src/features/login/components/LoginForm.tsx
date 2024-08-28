import LoginStyles from '../styles/login.module.css';
import LoginInputs from './LoginInputs';
import { LoginUser } from '../helpers/LoginUser';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LoggedUser } from '../interfaces/LoggedUser';
interface LoginFormProps {
	e: React.FormEvent<HTMLFormElement>;
	usuario: string;
	password: string;
	letterId: string;
}

export const LoginForm = () => {
	const { setUser } = useContext(AuthContext);
	const [usuario, setUsuario] = useState('');
	const [password, setPassword] = useState('');
	const [letterId, setLetterId] = useState('V-');
	const navigate = useNavigate();

	console.log(letterId + usuario);

	const handleSubmit = ({
		e,
		usuario,
		password,
		letterId,
	}: LoginFormProps) => {
		e.preventDefault();
		if (usuario.length >= 1 && password.length >= 3) {
			LoginUser({ id: letterId + usuario, password: password })
				.then(response => {
					const token = response.headers.get('auth');

					if (!token) {
						throw new Error('Error al iniciar sesión');
					}
					if (response.ok) {
						response
							.json()
							.then((userData: LoggedUser) => {
								userData.token = token;
								return setUser(userData);
							})
							.then(() => {
								navigate('/home', { replace: true });
							})
							.catch(error => {
								alert(error);
							});
					} else {
						alert('verifique sus datos');
						return;
					}
				})
				.catch(error => {
					alert(error);
					return;
				});
		} else {
			alert('Introduzca datos validos');
			return;
		}
	};
	return (
		<div className={LoginStyles['login-container__form']}>
			<h1 className={LoginStyles['login-container__form__title']}>
				¡Bienvenido!
			</h1>
			<h2 className={LoginStyles['login-container__form__subtitle']}>
				Ingrese sus credenciales para acceder a su cuenta
			</h2>
			<form
				action="POST"
				onSubmit={e => {
					handleSubmit({ e, usuario, password, letterId });
				}}
				className={LoginStyles['login-container__form--login']}
			>
				<LoginInputs
					setUsuario={setUsuario}
					setPassword={setPassword}
					setLetterId={setLetterId}
				/>
				<div className={LoginStyles['login-container__submit']}>
					<button
						type="submit"
						value="Ingresar"
						className={LoginStyles['login-container__input-submit']}
					>
						Ingresar
					</button>
				</div>
			</form>
		</div>
	);
};

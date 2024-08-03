import React, { Dispatch } from 'react';
import LoginStyles from '../styles/login.module.css';
import LoginInputUser from '../../../assets/user.svg';
import LoginInputPassword from '../../../assets/password.svg';

interface LoginData {
	setLetterId:Dispatch<React.SetStateAction<string>>;
	setUsuario: Dispatch<React.SetStateAction<string>>;
	setPassword: Dispatch<React.SetStateAction<string>>;
}

const LoginInputs = ({ setUsuario, setPassword,setLetterId }: LoginData) => {
	return (
		<div className={LoginStyles.fields}>
			<div className={LoginStyles.field}>
				<div className={LoginStyles['login-container__user']}>
					<label htmlFor="username" className={LoginStyles.label}>
						Usuario
					</label>
				</div>
				<div className={LoginStyles['login-container__select']}>
					<div className={LoginStyles['login-container__select--letter']}>
						<img src={LoginInputUser} alt="" />
						<select name="letterId" id="letterId" onChange={(e)=>{
							setLetterId(e.target.value)
						}}>
							<option value="V-">V-</option>
							<option value="E-">E-</option>
						</select>
					</div>
					
					<input
						type="text"
						id="username"
						name="username"
						className={LoginStyles['login-input__username']}
						placeholder="Cédula"
						onChange={e => setUsuario(e.target.value)}
					/>
				</div>
				
			</div>
			<div className={LoginStyles.field}>
				<div className={LoginStyles['login-container__password']}>
					<label htmlFor="password" className={LoginStyles.label}>
						Contraseña
					</label>
				</div>
				<div className={LoginStyles['login-container__img--password']}>
					<img src={LoginInputPassword} alt="" />
					<input
						type="password"
						id="password"
						name="password"
						className={LoginStyles['login-input__password']}
						placeholder="Contraseña"
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				
			</div>
		</div>
	);
};

export default LoginInputs;

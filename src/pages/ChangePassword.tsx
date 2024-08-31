import { ContentContainer } from '../features/ui/container/components/ContentContainer';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { Title } from '../features/ui/title/components/Title';
import { TitleList } from '../features/ui/title/components/TitleList';
import { InputFormField } from '../features/subject/components/InputFormField';
import { useForm } from '../shared/hooks/useForm';
import PasswordCSS from '../features/changePassword/styles/changePassword.module.css';
import { useContext } from 'react';
import { AuthContext } from '../features/login/context/AuthContext';
import { changePassword } from '../features/changePassword/helpers/changePassword';
import { useLogout } from '../features/login/hooks/useLogout';

export const ChangePassword = () => {
	const { password, onInputChange } = useForm({ password: '' });
	const { user } = useContext(AuthContext);
	const logout = useLogout();

	const handleSubmit = () => {
		if (!user) return;
		if (password.length < 8)
			return alert('La comtraseña debe de tener más de 8 caracteres');
		changePassword(user.person_id, password, user.token)
			.then(response => {
				if (response.ok) {
					alert('Contraseña cambiada exitosamente!');
					return logout();
				}
				alert('Hubo un error, vuélvalo a intentar más tarde');
			})
			.catch(err => console.log(err));
	};
	return (
		<>
			<TitleList>
				<Title content="Configuración" />
				<BackgroundColoredSubtitle content="Cambiar contraseña" />
			</TitleList>
			<ContentContainer>
				<div className={PasswordCSS.form}>
					<InputFormField
						onInputChange={onInputChange}
						value={password}
						placeholder="Ingrese su nueva contraseña"
						name="password"
					/>
					<button
						className={PasswordCSS.sendButton}
						onClick={handleSubmit}
					>
						Cambiar contraseña
					</button>
				</div>
			</ContentContainer>
		</>
	);
};

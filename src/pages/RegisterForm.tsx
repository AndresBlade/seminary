import RegisterCreate from '../features/form/components/RegisterCreate';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';

const RegisterForm = () => {
	return (
		<>
			<TitleList>
				<Title content="Usuarios" />
				<BackgroundColoredSubtitle content="Crear usuario" />
				<RegisterCreate />
			</TitleList>
		</>
	);
};

export default RegisterForm;

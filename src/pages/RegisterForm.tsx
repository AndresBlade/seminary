import RegisterCreate from '../features/form/components/RegisterCreate';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';

const RegisterForm = () => {
	return (
		<>
			<TitleList>
				<Title content="Usuario" />
				<BackgroundColoredSubtitle content="Crear usuario" />
			</TitleList>
			<RegisterCreate />
		</>
	);
};

export default RegisterForm;

import ContentTitle from '../features/ui/contentTitle/components/ContentTitle';
import RegisterCreate from '../features/form/components/RegisterCreate';
import FormCSS from '../features/form/styles/FormCSS.module.css';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';

const RegisterForm = () => {
	return (
		<>
			<TitleList>
				<Title content="Profesor" />
				<BackgroundColoredSubtitle content="Agregar Profesor" />
			</TitleList>
			{/* <ContentTitle title='Profesor' subtitle='Agregar Profesor'/> */}
			<RegisterCreate />
		</>
	);
};

export default RegisterForm;

import { ShowDataContent } from '../features/form/components/ShowDataContent';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
const RegisterTable = () => {
	return (
		<>
			<TitleList>
				<Title content="Usuarios" />
				<BackgroundColoredSubtitle content="Lista de Usuarios" />
				<ShowDataContent />
			</TitleList>
		</>
	);
};

export default RegisterTable;

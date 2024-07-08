import Diocesis from '../features/diocesis/styles/diocesis.module.css';
import DiocesisShowData from '../features/diocesis/components/DiocesisShowData';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';

export const DiocesisTable = () => {
	return (
		<>
			<TitleList>
				<Title content="Diócesis" />
				<BackgroundColoredSubtitle content="Lista de Diócesis" />
			</TitleList>
			<DiocesisShowData />
		</>
	);
};

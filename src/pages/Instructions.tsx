import { Table } from '../features/instruction/components/Table';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { Title } from '../features/ui/title/components/Title';
import { TitleList } from '../features/ui/title/components/TitleList';

export const Instructions = () => {
	return (
		<>
			<TitleList>
				<Title content="Período académico" />
				<BackgroundColoredSubtitle content="Asignar profesores a materias" />
			</TitleList>
			<Table />
		</>
	);
};

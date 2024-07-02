import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { Title } from '../features/ui/title/components/Title';
import { TitleList } from '../features/ui/title/components/TitleList';

export const SubjectForm = () => {
	return (
		<>
			<TitleList>
				<Title content="Materia" />
				<BackgroundColoredSubtitle content="Crear Materia" />
			</TitleList>
		</>
	);
};

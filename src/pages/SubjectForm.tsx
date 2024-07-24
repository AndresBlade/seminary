import { useParams } from 'react-router-dom';
import { Form } from '../features/subject/components/Form';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { Title } from '../features/ui/title/components/Title';
import { TitleList } from '../features/ui/title/components/TitleList';

export const SubjectForm = () => {
	const { id } = useParams();
	return (
		<>
			<TitleList>
				<Title content="Materia" />
				<BackgroundColoredSubtitle
					content={
						isNaN(Number(id)) ? 'Crear Materia' : 'Editar materia'
					}
				/>
			</TitleList>
			<Form />
		</>
	);
};

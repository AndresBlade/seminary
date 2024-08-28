import { useParams } from 'react-router-dom';
import { DiocesisForm } from '../features/diocesis/components/DiocesisForm';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
export const DiocesisCreate = () => {
	const { id } = useParams();
	return (
		<>
			<TitleList>
				<Title content="Eclesiástico" />
				<BackgroundColoredSubtitle
					content={
						isNaN(Number(id)) ? 'Crear Diocesis' : 'Editar Diocesis'
					}
				/>
			</TitleList>
			<DiocesisForm />
		</>
	);
};

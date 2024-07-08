import { useParams } from 'react-router-dom';

import Diocesis from '../features/diocesis/styles/diocesis.module.css';
import ContentTitle from '../features/ui/contentTitle/components/ContentTitle';
import { DiocesisForm } from '../features/diocesis/components/DiocesisForm';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
export const DiocesisCreate = () => {
	const { id } = useParams();
	return (
		<>
			<TitleList>
				<Title content="Diócesis" />
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

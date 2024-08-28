import { ParishForm } from '../features/parish/components/ParishForm';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
export const ParishCreate = () => {
	return (
		<>
			<TitleList>
				<Title content="Eclesiástico" />
				<BackgroundColoredSubtitle content="Agregar parroquia" />
			</TitleList>
			<ParishForm />
		</>
	);
};

import { Period } from '../features/period/components/Period';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
export const PeriodCreate = () => {
	return (
		<>
			<TitleList>
				<Title content="Académico" />
				<BackgroundColoredSubtitle content="Período académico" />
				<Period />
			</TitleList>
		</>
	);
};

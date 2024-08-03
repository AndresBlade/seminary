import { SearchBar } from '../features/subject/components/SearchBar';
import { SubjectTable } from '../features/subject/components/SubjectTable';
import { ContentContainer } from '../features/ui/container/components/ContentContainer';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { Title } from '../features/ui/title/components/Title';
import { TitleList } from '../features/ui/title/components/TitleList';
import FormCSS from '../features/subject/styles/SubjectForm.module.css';
import { useSubjectOrder } from '../features/subject/hooks/useSubjectOrder';

export const Subjects = () => {
	const {
		subjects,
		setSubjects,
		handleOrderChange,
		setSubjectsSetToDefault,
		order,
		originalSubjects,
	} = useSubjectOrder();
	return (
		<>
			<TitleList>
				<Title content="Materia" />
				<BackgroundColoredSubtitle content="Lista de Materias" />
			</TitleList>
			<ContentContainer>
				<div className={FormCSS.form}>
					<SearchBar
						setSubjects={setSubjects}
						originalSubjects={originalSubjects}
						setSubjectsSetToDefault={setSubjectsSetToDefault}
					/>
					<SubjectTable
						subjects={subjects}
						setSubjects={setSubjects}
						order={order}
						handleOrderChange={handleOrderChange}
						setSubjectsSetToDefault={setSubjectsSetToDefault}
					/>
				</div>
			</ContentContainer>
		</>
	);
};

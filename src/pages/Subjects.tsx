import { SearchBar } from '../features/subject/components/SearchBar';
import { SubjectTable } from '../features/subject/components/SubjectTable';
import { ContentContainer } from '../features/ui/container/components/ContentContainer';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { Title } from '../features/ui/title/components/Title';
import { TitleList } from '../features/ui/title/components/TitleList';
import FormCSS from '../features/subject/styles/SubjectForm.module.css';
import { useOrder } from '../features/subject/hooks/useOrder';
import { useSubjects } from '../features/subject/hooks/useSubjects';

export const Subjects = () => {
	const { subjects: subjectsFromDB, setSubjects: setSubjectsFromDB } =
		useSubjects();

	const {
		value: subjects,
		setValue: setSubjects,
		handleOrderChange,
		setValueSetToDefault: setSubjectsSetToDefault,
		setOriginalValue: setOriginalSubjects,
		order,
		originalValue: originalSubjects,
	} = useOrder({
		value: subjectsFromDB,
		setValue: setSubjectsFromDB,
		name: 'description',
		stage: 1,
	});
	return (
		<>
			<TitleList>
				<Title content="Académico" />
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
						setOriginalSubjects={setOriginalSubjects}
					/>
				</div>
			</ContentContainer>
		</>
	);
};

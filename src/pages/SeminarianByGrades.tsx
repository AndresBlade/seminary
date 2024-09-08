import { ContentContainer } from '../features/ui/container/components/ContentContainer';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { Title } from '../features/ui/title/components/Title';
import { TitleList } from '../features/ui/title/components/TitleList';
import FormCSS from '../features/subject/styles/SubjectForm.module.css';
import { SelectFormField } from '../features/subject/components/SelectFormField';
import { useForm } from '../shared/hooks/useForm';
import { OptionHTMLAttributes, useContext } from 'react';
import ReportCSS from '../features/report/styles/Reports.module.css';
import { AuthContext } from '../features/login/context/AuthContext';
import { useAcademicTerms } from '../features/instruction/hooks/useAcademicTerm';
import { useSubjects } from '../features/subject/hooks/useSubjects';
import { InputFormField } from '../features/subject/components/InputFormField';
import { getSeminarianListByGrades } from '../features/report/helpers/getSeminarianListByGrades';

const limitGrades = (grade: number) =>
	grade > 20 ? 20 : grade < 0 ? 0 : grade;

export const SeminarianByGrades = () => {
	const { user } = useContext(AuthContext);

	const {
		subject_id,
		academic_term_id,
		grade,
		onSelectChange,
		onInputChange,
	} = useForm({
		subject_id: 0,
		academic_term_id: 0,
		grade: 0,
	});

	const academicTerms = useAcademicTerms();
	const { subjects } = useSubjects();

	const activeSubjectsForSelect:
		| OptionHTMLAttributes<HTMLOptionElement>[]
		| undefined = subjects
		?.filter(subject => subject.status === true)
		.map(subject => ({
			content: subject.description,
			value: subject.id,
		}));

	activeSubjectsForSelect?.unshift({
		content: 'Seleccione una materia',
		value: 0,
		disabled: true,
	});

	const academicTermsForSelect:
		| OptionHTMLAttributes<HTMLOptionElement>[]
		| undefined = academicTerms?.map(academicTerm => ({
		content: academicTerm.name,
		value: academicTerm.id,
	}));

	academicTermsForSelect?.unshift({
		content: 'Seleccione un período académico',
		value: 0,
		disabled: true,
	});
	const isButtonDisabled =
		subject_id === 0 || (academic_term_id === 0 && grade === 0);
	return (
		<>
			<TitleList>
				<Title content="Reportes" />
				<BackgroundColoredSubtitle content="Seminarista por notas" />
			</TitleList>
			<ContentContainer>
				<div className={FormCSS.form}>
					{academicTermsForSelect && (
						<SelectFormField
							labelText="Período académico"
							name="academic_term_id"
							onSelectChange={onSelectChange}
							value={academic_term_id}
							options={academicTermsForSelect}
						/>
					)}
					{activeSubjectsForSelect && (
						<SelectFormField
							labelText="Materia"
							name="subject_id"
							onSelectChange={onSelectChange}
							value={subject_id}
							options={activeSubjectsForSelect}
						/>
					)}
					<InputFormField
						onInputChange={e => {
							e.target.value = limitGrades(
								+e.target.value
							).toString();
							onInputChange(e);
						}}
						name="grade"
						max={20}
						min={0}
						labelText="Nota menor que"
						type="number"
						value={grade}
					></InputFormField>
				</div>
				<div className={ReportCSS.buttonContainer}>
					<button
						disabled={isButtonDisabled}
						className={ReportCSS.sendButton}
						onClick={() => {
							user &&
								subject_id &&
								academic_term_id &&
								grade &&
								getSeminarianListByGrades(
									user.token,
									academic_term_id,
									subject_id,
									grade
								).catch(error => console.log(error));
						}}
					>
						GENERAR REPORTE
					</button>
				</div>
			</ContentContainer>
		</>
	);
};

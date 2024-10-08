import { useForm } from '../../../shared/hooks/useForm';
import SearchBarCSS from '../styles/SearchBar.module.css';
import { InputFormField } from './InputFormField';
import { SelectFormField } from './SelectFormField';
import { useCourses } from '../hooks/useCourses';
import { useContext, useEffect } from 'react';
import { SubjectFromDB } from '../interfaces/SubjectFromDB';
import { getPensum } from '../helpers/getPensum';
import { AuthContext } from '../../login/context/AuthContext';

const semesters = [
	{ name: 'Primero', value: 1 },
	{ name: 'Segundo', value: 2 },
];

interface Props {
	originalSubjects: SubjectFromDB[] | null;
	setSubjects: React.Dispatch<React.SetStateAction<SubjectFromDB[] | null>>;
	setSubjectsSetToDefault: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = ({
	originalSubjects,
	setSubjects,
	setSubjectsSetToDefault,
}: Props) => {
	const {
		name,
		course,
		semester,
		setFormState,
		onInputChange,
		onSelectChange,
	} = useForm({
		name: '',
		course: '0',
		semester: semesters[0].value.toString(),
	});

	const { user } = useContext(AuthContext);

	const courses = useCourses();

	useEffect(() => {
		courses &&
			setFormState(formState => ({
				...formState,
				course: courses[0].id.toString(),
			}));
	}, [courses, setFormState]);
	return (
		<div className={SearchBarCSS.searchBar}>
			<div className={SearchBarCSS.fields}>
				<InputFormField
					type="text"
					onInputChange={onInputChange}
					value={name}
					className={SearchBarCSS.field}
					id="name"
					name="name"
					placeholder="Buscar por nombre o código..."
				/>
				{courses && (
					<SelectFormField
						onSelectChange={onSelectChange}
						className={SearchBarCSS.field}
						name="course"
						options={courses?.map(course => ({
							content: course.description,
							value: course.id,
						}))}
					/>
				)}

				<SelectFormField
					onSelectChange={onSelectChange}
					className={SearchBarCSS.field}
					name="semester"
					options={semesters?.map(semester => ({
						content: semester.name,
						value: semester.value,
					}))}
				/>
			</div>

			<div className={SearchBarCSS.buttons}>
				<button
					className={SearchBarCSS.generatePDFButton}
					onClick={() => {
						user &&
							getPensum(user.token).catch(error =>
								console.log(error)
							);
					}}
				>
					GENERAR PÉNSUM
				</button>
				<button
					className={SearchBarCSS.resetButton}
					onClick={() => setSubjectsSetToDefault(false)}
				>
					REINICIAR
				</button>
				<button
					className={SearchBarCSS.sendButton}
					onClick={() =>
						setSubjects(
							originalSubjects?.filter(subject => {
								console.log(
									subject.description.includes(
										name.toUpperCase()
									) &&
										subject.course_id === +course &&
										subject.semester === +semester
								);
								return (
									subject.description.includes(
										name.toUpperCase()
									) &&
									subject.course_id === +course &&
									subject.semester === +semester
								);
							}) ?? null
						)
					}
				>
					BUSCAR
				</button>
			</div>
		</div>
	);
};

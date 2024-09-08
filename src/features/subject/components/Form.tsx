import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { InputFormField } from './InputFormField';
import FormCSS from '../styles/SubjectForm.module.css';
import { useForm } from '../../../shared/hooks/useForm';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { SelectFormField } from './SelectFormField';
import { ErrorBox } from './ErrorBox';
import { FormField } from './FormField';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { createSubject } from '../helpers/createSubject';
import { AuthContext } from '../../login/context/AuthContext';
import { useSubjects } from '../hooks/useSubjects';
import { useCourses } from '../hooks/useCourses';
import { useAcademicFields } from '../hooks/useAcademicFields';
import { editSubject } from '../helpers/editSubject';

interface Form {
	name: string;
	course: string;
	semester: '1' | '2';
	precedent: number | null;
	academicField: string;
}

interface HandleSubmitProps {
	e: FormEvent<HTMLFormElement>;
	form: Form;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	navigate: NavigateFunction;
	token: string;
	id: string | undefined;
}

const handleSubmit = ({
	e,
	form,
	setError,
	navigate,
	token,
	id,
}: HandleSubmitProps) => {
	e.preventDefault();
	if (!form.name) return setError('Incluya el nombre de la materia');
	const semester = +form.semester;
	if (semester !== 1 && semester !== 2) return;

	(isNaN(Number(id))
		? createSubject({
				subject: {
					description: form.name,
					academic_field_id: +form.academicField,
					course_id: +form.course,
					precedent: form.precedent,
					semester,
				},
				token,
		  })
		: editSubject({
				subject: {
					id: Number(id),
					description: form.name,
					academic_field_id: +form.academicField,
					course_id: +form.course,
					precedent: form.precedent,
					status: true,
					semester,
				},
				token,
		  })
	)
		.then(() => navigate('..'))
		.catch(err => console.log(err));
	console.log(form);
	console.log('form submitted');
};

export const Form = () => {
	const {
		name,
		course,
		semester,
		precedent,
		academicField,
		formState,
		onInputChange,
		onSelectChange,
		setFormState,
	} = useForm<Form>({
		name: '',
		course: '1',
		semester: '1',
		precedent: null,
		academicField: '2',
	});

	const [error, setError] = useState<string | null>(null);
	const { user } = useContext(AuthContext);
	const { subjects } = useSubjects();
	const courses = useCourses();
	const academicFields = useAcademicFields();
	const navigate = useNavigate();
	const selectSubjectOptions = subjects?.filter(
		subject =>
			subject.course_id < +course ||
			(subject.course_id === +course && subject.semester < +semester)
		//&& subject.semester > +semester
	);
	const courseStage = courses?.find(
		courseFromDB => courseFromDB.id === +course
	)?.stage_id;

	const canThereBePrecedents = !!selectSubjectOptions?.length;

	const { id } = useParams();

	console.log(formState);

	useEffect(() => {
		if (!subjects) return;
		const idAsNumber = Number(id);
		if (isNaN(idAsNumber)) return;

		const subject = subjects.find(subject => subject.id === idAsNumber);

		if (!subject) return;

		console.log(subject);

		setFormState({
			name: subject.description,
			academicField: subject.academic_field_id.id.toString(),
			course: subject.course_id.toString(),
			precedent: subject.precedent ? subject.precedent.id : null,
			semester: subject.semester.toString() as '1' | '2',
		});
	}, [id, setFormState, subjects]);

	useEffect(() => {
		if (!isNaN(Number(id))) return;
		if (courses)
			setFormState(formState => ({
				...formState,
				course: courses[0].id.toString(),
			}));
	}, [courses, setFormState, id]);

	useEffect(() => {
		if (!isNaN(Number(id))) return;
		if (academicFields)
			setFormState(formState => ({
				...formState,
				course: academicFields[0].id.toString(),
			}));
	}, [academicFields, setFormState, id]);

	useEffect(() => {
		if (!canThereBePrecedents)
			setFormState(formState => ({ ...formState, precedent: null }));
	}, [canThereBePrecedents, setFormState]);
	return (
		<ContentContainer>
			<form
				className={FormCSS.form}
				onSubmit={e => {
					if (user)
						handleSubmit({
							e,
							form: formState,
							setError,
							navigate,
							token: user.token,
							id,
						});
				}}
			>
				<div className={FormCSS.formFields}>
					<InputFormField
						type="text"
						name="name"
						labelText="Nombre de la materia *"
						placeholder="Ej. Catecismo de la iglesia católica I"
						autoComplete="Off"
						id="code"
						value={name}
						onInputChange={e => {
							e.target.value = e.target.value.toUpperCase();
							onInputChange(e);
						}}
					/>

					{courses && (
						<SelectFormField
							labelText="Curso *"
							name="course"
							id="course"
							// options={[
							// 	{ content: 'Filosofía 1', value: '1' },
							// 	{ content: 'Filosofía 2', value: '2' },
							// ]}
							options={courses.map(course => ({
								content: course.description,
								value: course.id,
							}))}
							value={course}
							onSelectChange={onSelectChange}
						/>
					)}

					<SelectFormField
						labelText="Semestre *"
						name="semester"
						id="semester"
						options={[
							{ content: 'Primer Semestre', value: '1' },
							{ content: 'Segundo Semestre', value: '2' },
						]}
						value={semester}
						onSelectChange={onSelectChange}
					/>

					{academicFields && (
						<SelectFormField
							labelText="Área de estudio *"
							name="academicField"
							id="academicField"
							options={academicFields
								.filter(
									academicField =>
										academicField.stage.id === courseStage
								)
								.map(academicFieldFromDB => ({
									content: academicFieldFromDB.description,
									value: academicFieldFromDB.id,
								}))}
							value={academicField}
							onSelectChange={onSelectChange}
						/>
					)}

					<FormField>
						<label className={FormCSS.label}>
							¿Se requiere aprobar una materia previa?
						</label>
						<div className={FormCSS.checkboxFormFieldDivider}>
							<input
								type="checkbox"
								id="precedentCheckbox"
								className={FormCSS.precedentCheckbox}
								disabled={!canThereBePrecedents}
								checked={precedent !== null}
								onChange={e => {
									if (selectSubjectOptions)
										setFormState(formState => ({
											...formState,
											precedent: e.target.checked
												? selectSubjectOptions[0].id
												: null,
										})); //We have to put the first academic field id once the endpoint is created
								}}
							/>
							<label htmlFor="precedentCheckbox">
								Sí, es necesario aprobar una materia previa para
								cursarla
							</label>
						</div>
					</FormField>

					{precedent !== null &&
						canThereBePrecedents &&
						selectSubjectOptions && (
							<SelectFormField
								name="precedent"
								labelText="Materia previa requerida *"
								id="precedent"
								options={selectSubjectOptions.map(subject => ({
									content: subject.description,
									value: subject.id,
								}))}
								value={precedent}
								onSelectChange={onSelectChange}
							/>
						)}
				</div>

				{error && <ErrorBox error={error} setError={setError} />}

				<div className={FormCSS.buttons}>
					<button type="submit" className={FormCSS.sendButton}>
						Enviar
					</button>
				</div>
			</form>
		</ContentContainer>
	);
};

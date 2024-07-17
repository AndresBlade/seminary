import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { InputFormField } from './InputFormField';
import FormCSS from '../styles/SubjectForm.module.css';
import { useForm } from '../../../shared/hooks/useForm';
import { FormEvent, useContext, useState } from 'react';
import { SelectFormField } from './SelectFormField';
import { ErrorBox } from './ErrorBox';
import { FormField } from './FormField';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { createSubject } from '../helpers/createSubject';
import { AuthContext } from '../../login/context/AuthContext';
import { RadioFormField } from './RadioFormField';
import { useSubjects } from '../hooks/useSubjects';
import { useCourses } from '../hooks/useCourses';

interface Form {
	name: string;
	code: string;
	course: string;
	semester: '1' | '2';
	precedent: number | null;
	academicField: string;
	homologated: '0' | '1';
}

interface HandleSubmitProps {
	e: FormEvent<HTMLFormElement>;
	form: Form;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	navigate: NavigateFunction;
	token: string;
}

const handleSubmit = ({
	e,
	form,
	setError,
	navigate,
	token,
}: HandleSubmitProps) => {
	e.preventDefault();
	if (!form.name) return setError('Incluya el nombre de la materia');
	if (!form.code) return setError('Incluya el código de la materia');

	const homologado = +form.homologated;
	const semester = +form.semester;

	if (homologado !== 0 && homologado !== 1) return;
	if (semester !== 1 && semester !== 2) return;

	createSubject({
		subject: {
			description: form.name,
			academic_field_id: +form.academicField,
			course_id: +form.course,
			homologado,
			precedent: form.precedent,
			semester,
		},
		token,
	})
		.then(() => navigate('..'))
		.catch(err => console.log(err));
	console.log(form);
	console.log('form submitted');
};

export const Form = () => {
	const {
		name,
		code,
		course,
		semester,
		precedent,
		academicField,
		homologated,
		formState,
		onInputChange,
		onSelectChange,
		onRadioChange,
		setFormState,
	} = useForm<Form>({
		name: '',
		code: '',
		course: '1',
		semester: '1',
		precedent: null,
		academicField: '2',
		homologated: '1',
	});
	// const [isSubjectHomologated, setIsSubjectHomologated] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { user } = useContext(AuthContext);
	const subjects = useSubjects();
	const courses = useCourses();
	const navigate = useNavigate();

	console.log(homologated);

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
						onInputChange={onInputChange}
					/>

					<InputFormField
						name="code"
						type="text"
						placeholder="Ej. CIC-1"
						labelText="Código de la materia *"
						id="code"
						value={code}
						onInputChange={onInputChange}
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

					<SelectFormField
						labelText="Área de estudio *"
						name="academicField"
						id="academicField"
						options={[
							{ content: 'Instrumentales', value: '1' },
							{ content: 'Filosofía Cultural', value: '2' },
						]}
						value={academicField}
						onSelectChange={onSelectChange}
					/>

					{/* <FormField>
						<label className={FormCSS.label}>
							¿Esta materia es NO homologada?
						</label>
						<div className={FormCSS.checkboxFormFieldDivider}>
							<input
								type="checkbox"
								id="homologatedSubjectCheckbox"
								className={FormCSS.precedentCheckbox}
								checked={isSubjectHomologated}
								onChange={e =>
									setIsSubjectHomologated(e.target.checked)
								}
							/>
							<label htmlFor="homologatedSubjectCheckbox">
								Sí, es necesario aprobar una materia previa para
								cursarla
							</label>
						</div>
					</FormField> */}

					<RadioFormField
						labelText="Tipo de Materia *"
						onRadioChange={onRadioChange}
						value={homologated}
						options={[
							{
								content: 'Homologada',
								name: 'homologated',
								value: '1',
								id: 'homologated',
							},
							{
								content: 'NO Homologada',
								name: 'homologated',
								value: '0',
								id: 'notHomologated',
							},
						]}
					/>

					<FormField>
						<label className={FormCSS.label}>
							¿Se requiere aprobar una materia previa?
						</label>
						<div className={FormCSS.checkboxFormFieldDivider}>
							<input
								type="checkbox"
								id="precedentCheckbox"
								className={FormCSS.precedentCheckbox}
								checked={precedent !== null}
								onChange={
									e =>
										setFormState(formState => ({
											...formState,
											precedent: e.target.checked
												? 1
												: null,
										})) //We have to put the first academic field id once the endpoint is created
								}
							/>
							<label htmlFor="precedentCheckbox">
								Sí, es necesario aprobar una materia previa para
								cursarla
							</label>
						</div>
					</FormField>

					{precedent !== null && subjects && (
						<SelectFormField
							name="precedent"
							labelText="Materia previa requerida *"
							id="precedent"
							// options={[
							// 	{ content: 'FIS-1', value: 'FIS-1' },
							// 	{ content: 'FIS-2', value: 'FIS-2' },
							// ]}
							options={subjects.map(subject => ({
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

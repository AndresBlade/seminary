import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { InputFormField } from './InputFormField';
import FormCSS from '../styles/SubjectForm.module.css';
import { useForm } from '../../../shared/hooks/useForm';
import { FormEvent, useEffect, useState } from 'react';
import { SelectFormField } from './SelectFormField';
import { ErrorBox } from './ErrorBox';

interface Form {
	name: string;
	code: string;
	course: string;
	semester: number;
	precedent: string;
}

const handleSubmit = (
	e: FormEvent<HTMLFormElement>,
	form: Form,
	setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
	e.preventDefault();
	if (!form.name) return setError('Incluya el nombre de la materia');
	if (!form.code) return setError('Incluya el código de la materia');
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
		formState,
		onInputChange,
		onSelectChange,
		setFormState,
	} = useForm<Form>({
		name: '',
		code: '',
		course: '',
		semester: 0,
		precedent: '',
	});
	const [isTherePrecedent, setIsTherePrecedent] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isTherePrecedent)
			setFormState(formState => ({ ...formState, precedent: '' }));
	}, [isTherePrecedent, setFormState]);

	return (
		<ContentContainer>
			<form
				className={FormCSS.form}
				onSubmit={e => handleSubmit(e, formState, setError)}
			>
				<div className={FormCSS.formFields}>
					<InputFormField
						type="text"
						name="name"
						labelText="Nombre de la materia"
						mandatory
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
						labelText="Código de la materia"
						mandatory
						id="code"
						value={code}
						onInputChange={onInputChange}
					/>

					<SelectFormField
						labelText="Curso"
						mandatory
						name="course"
						id="course"
						options={[
							{ content: 'Filosofía 1', value: 'FIS-1' },
							{ content: 'Filosofía 2', value: 'FIS-2' },
						]}
						value={course}
						onSelectChange={onSelectChange}
					/>

					<SelectFormField
						labelText="Semestre"
						mandatory
						name="semester"
						id="semester"
						options={[
							{ content: 'Primer Semestre', value: '1' },
							{ content: 'Segundo Semestre', value: '2' },
						]}
						value={semester}
						onSelectChange={onSelectChange}
					/>

					<div className={FormCSS.formField}>
						<label>¿Se requiere aprobar una materia previa?</label>
						<div className={FormCSS.checkboxFormFieldDivider}>
							<input
								type="checkbox"
								id="precedentCheckbox"
								className={FormCSS.precedentCheckbox}
								checked={isTherePrecedent}
								onChange={e =>
									setIsTherePrecedent(e.target.checked)
								}
							/>
							<label htmlFor="precedentCheckbox">
								Sí, es necesario aprobar una materia previa para
								cursarla
							</label>
						</div>
					</div>

					{isTherePrecedent && (
						<SelectFormField
							name="precedent"
							labelText="Materia previa requerida"
							mandatory
							id="precedent"
							options={[
								{ content: 'FIS-1', value: 'FIS-1' },
								{ content: 'FIS-2', value: 'FIS-2' },
							]}
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

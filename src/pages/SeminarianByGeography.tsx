import { ContentContainer } from '../features/ui/container/components/ContentContainer';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { Title } from '../features/ui/title/components/Title';
import { TitleList } from '../features/ui/title/components/TitleList';
import FormCSS from '../features/subject/styles/SubjectForm.module.css';
import { SelectFormField } from '../features/subject/components/SelectFormField';
import { useDiocesis } from '../features/report/hooks/useDioceses';
import { useForm } from '../shared/hooks/useForm';
import { OptionHTMLAttributes, useContext } from 'react';
import ReportCSS from '../features/report/styles/Reports.module.css';
import { getSeminarianList } from '../features/report/helpers/getSeminarianList';
import { AuthContext } from '../features/login/context/AuthContext';
export const SeminarianByGeography = () => {
	const { user } = useContext(AuthContext);

	const dioceses = useDiocesis();

	const diocesesForSelect:
		| OptionHTMLAttributes<HTMLOptionElement>[]
		| undefined = dioceses?.map(diocese => ({
		content: diocese.name,
		value: diocese.id,
	}));

	diocesesForSelect?.unshift({
		content: 'Seleccione una diócesis',
		value: 0,
		disabled: true,
	});

	const conditionsForSelect: OptionHTMLAttributes<HTMLOptionElement>[] = [
		{ content: 'Seleccione una condición', value: 0, disabled: true },
		{ content: 'INTERNO', value: 'INTERNO' },
		{ content: 'EXTERNO', value: 'EXTERNO' },
	];

	const { diocese, condition, onSelectChange } = useForm<{
		diocese: number;
		condition: 0 | 'INTERNO' | 'EXTERNO';
	}>({
		diocese: 0,
		condition: 0,
	});

	const isButtonDisabled = diocese === 0 || condition === 0;
	return (
		<>
			<TitleList>
				<Title content="Reportes" />
				<BackgroundColoredSubtitle content="Seminarista por geografía" />
			</TitleList>
			<ContentContainer>
				<div className={FormCSS.form}>
					{diocesesForSelect && (
						<SelectFormField
							labelText="Diócesis"
							name="diocese"
							onSelectChange={onSelectChange}
							value={diocese}
							options={diocesesForSelect}
						/>
					)}
					<SelectFormField
						labelText="Condición"
						name="condition"
						onSelectChange={onSelectChange}
						value={condition}
						options={conditionsForSelect}
					/>
				</div>
				<div className={ReportCSS.buttonContainer}>
					<button
						disabled={isButtonDisabled}
						className={ReportCSS.sendButton}
						onClick={() => {
							user &&
								diocese &&
								condition &&
								getSeminarianList(
									user.token,
									diocese,
									condition
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

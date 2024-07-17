import FormCSS from '../styles/SubjectForm.module.css';
import { InputHTMLAttributes } from 'react';
import { Label } from './Label';
import { FormField } from './FormField';

interface Option extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	value: string;
	content: string;
}

interface Props {
	options: Option[];
	labelText?: string;
	value: string;
	onRadioChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioFormField = (props: Props) => {
	const { labelText, options, value, onRadioChange } = props;
	return (
		<FormField>
			{labelText && <Label labelText={labelText} />}
			{options.map(option => {
				const { content, ...rest } = option;
				return (
					<div className={FormCSS.radioField} key={option.id}>
						<input
							type="radio"
							onChange={onRadioChange}
							checked={option.value === value}
							{...rest}
						/>
						<label htmlFor={option.id}>{content}</label>
					</div>
				);
			})}
		</FormField>
	);
};

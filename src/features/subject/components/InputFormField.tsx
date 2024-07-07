import { InputHTMLAttributes } from 'react';

import FormCSS from '../styles/SubjectForm.module.css';
import { Label } from './Label';
import { FormField } from './FormField';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	labelText?: string;
	onInputChange: ({
		target,
	}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InputFormField = (props: Props) => {
	const { labelText, onInputChange, id, ...rest } = props;
	return (
		<FormField>
			{labelText && <Label labelText={labelText} htmlFor={id} />}
			<input
				className={FormCSS.input}
				onChange={onInputChange}
				{...rest}
			/>
		</FormField>
	);
};

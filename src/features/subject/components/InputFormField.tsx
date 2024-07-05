import { InputHTMLAttributes } from 'react';

import FormCSS from '../styles/SubjectForm.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	labelText?: string;
	mandatory: boolean;
	onInputChange: ({
		target,
	}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InputFormField = (props: Props) => {
	const { labelText, mandatory, onInputChange, id, ...rest } = props;
	return (
		<div className={FormCSS.formField}>
			{labelText && (
				<label htmlFor={id} className={FormCSS.label}>
					{labelText} {mandatory && '*'}
				</label>
			)}
			<input
				className={FormCSS.input}
				onChange={onInputChange}
				{...rest}
			/>
		</div>
	);
};

import { InputHTMLAttributes } from 'react';

import FormCSS from '../styles/SubjectForm.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	onInputChange: ({
		target,
	}: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input = (props: Props) => {
	const { onInputChange, ...rest } = props;
	return (
		<input className={FormCSS.input} {...rest} onChange={onInputChange} />
	);
};

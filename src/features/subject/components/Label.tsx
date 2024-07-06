import { LabelHTMLAttributes } from 'react';

import FormCSS from '../styles/SubjectForm.module.css';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
	labelText: string;
}

export const Label = (props: Props) => {
	const { labelText, ...rest } = props;
	return (
		<label className={FormCSS.label} {...rest}>
			{labelText}
		</label>
	);
};

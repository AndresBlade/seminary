import { LabelHTMLAttributes } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
	labelText: string;
	mandatory: boolean;
}

export const FormLabel = (props: Props) => {
	const { labelText, mandatory, id, ...rest } = props;
	return (
		<label htmlFor={id} {...rest}>
			{labelText} {mandatory && '*'}
		</label>
	);
};

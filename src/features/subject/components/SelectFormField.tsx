import { OptionHTMLAttributes, SelectHTMLAttributes } from 'react';

import FormCSS from '../styles/SubjectForm.module.css';
import { Label } from './Label';
import { FormField } from './FormField';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	labelText?: string;
	options: OptionHTMLAttributes<HTMLOptionElement>[];
	onSelectChange: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectFormField = (props: Props) => {
	const { labelText, options, onSelectChange, id, ...rest } = props;
	return (
		<FormField className={rest.className}>
			{labelText && <Label labelText={labelText} htmlFor={id} />}
			<select
				{...rest}
				className={FormCSS.select}
				onChange={onSelectChange}
			>
				{options.map(option => (
					<option
						key={option.value?.toString()}
						value={option.value}
						{...option}
					>
						{option.content}
					</option>
				))}
			</select>
		</FormField>
	);
};

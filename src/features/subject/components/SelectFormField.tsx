import { OptionHTMLAttributes, SelectHTMLAttributes } from 'react';

import FormCSS from '../styles/SubjectForm.module.css';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	labelText?: string;
	mandatory: boolean;
	options: OptionHTMLAttributes<HTMLOptionElement>[];
	onSelectChange: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectFormField = (props: Props) => {
	const { labelText, mandatory, options, onSelectChange, id, ...rest } =
		props;
	return (
		<div className={FormCSS.formField}>
			{labelText && (
				<label htmlFor={id} className={FormCSS.label}>
					{labelText} {mandatory && '*'}
				</label>
			)}
			<select
				{...rest}
				className={FormCSS.select}
				onChange={onSelectChange}
			>
				{options.map(option => (
					<option key={option.value?.toString()} value={option.value}>
						{option.content}
					</option>
				))}
			</select>
		</div>
	);
};

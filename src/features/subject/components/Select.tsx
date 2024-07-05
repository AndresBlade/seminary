import { OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import FormCSS from '../styles/SubjectForm.module.css';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	options: OptionHTMLAttributes<HTMLOptionElement>[];
	onSelectChange: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = (props: Props) => {
	const { options, onSelectChange, ...rest } = props;
	return (
		<select {...rest} className={FormCSS.select} onChange={onSelectChange}>
			{options.map(option => (
				<option key={option.value?.toString()} value={option.value}>
					{option.content}
				</option>
			))}
		</select>
	);
};

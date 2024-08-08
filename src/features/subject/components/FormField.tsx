import { HTMLAttributes, ReactNode } from 'react';

import FormCSS from '../styles/SubjectForm.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}
export const FormField = (props: Props) => {
	const { children, ...rest } = props;
	return (
		<div
			{...rest}
			className={
				rest.className
					? `${FormCSS.formField} ${rest.className}`
					: FormCSS.formField
			}
		>
			{children}
		</div>
	);
};

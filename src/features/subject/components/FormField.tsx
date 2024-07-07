import { ReactNode } from 'react';

import FormCSS from '../styles/SubjectForm.module.css';

interface Props {
	children: ReactNode;
}
export const FormField = ({ children }: Props) => {
	return <div className={FormCSS.formField}>{children}</div>;
};

import { ReactNode } from 'react';
import FormCSS from '../styles/SubjectForm.module.css';

interface Props {
	children: ReactNode;
}

export const FormFields = ({ children }: Props) => {
	return <div className={FormCSS.formFields}>{children}</div>;
};

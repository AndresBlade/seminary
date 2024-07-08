import { useEffect } from 'react';
import FormCSS from '../styles/SubjectForm.module.css';

interface Props {
	error: string;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ErrorBox = ({ error, setError }: Props) => {
	useEffect(() => {
		if (error)
			setTimeout(() => {
				setError(null);
			}, 5000);
	}, [error, setError]);

	return <p className={FormCSS.errorBox}>{error}</p>;
};

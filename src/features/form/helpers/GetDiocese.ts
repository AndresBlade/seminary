import { useContext } from 'react';
import { AuthContext } from '../../login/context/AuthContext';

interface getDioceseProps {
	id: string;
	name: string;
	holder: string;
}

export const GetDiocese = (): Promise<getDioceseProps[] | undefined> => {
	const { user } = useContext(AuthContext);
	if (!user) return Promise.resolve(undefined);

	return fetch(`${import.meta.env.VITE_URL}/Diocese/`, {
		headers: {
			auth: user?.token,
		},
	})
		.then(response => {
			return response.json();
		})
		.then(data => data as getDioceseProps[]);
};

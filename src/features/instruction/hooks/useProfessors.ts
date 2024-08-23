import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../login/context/AuthContext';
import { Professor } from '../interfaces/Professor';
import { getProfessors } from '../helpers/getProfessors';

export const useProfessors = () => {
	const [professors, setProfessors] = useState<Professor[] | null>(null);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		getProfessors(user.token)
			.then(professors => setProfessors(professors))
			.catch(error => console.log(error));
	}, [user]);

	return professors;
};

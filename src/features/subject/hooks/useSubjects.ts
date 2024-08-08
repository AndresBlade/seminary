import { useContext, useEffect, useState } from 'react';
import { SubjectFromDB } from '../interfaces/SubjectFromDB';
import { AuthContext } from '../../login/context/AuthContext';
import { getAllSubjects } from '../helpers/getAllSubjects';

export const useSubjects = () => {
	const [subjects, setSubjects] = useState<SubjectFromDB[] | null>(null);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		getAllSubjects(user.token)
			.then(subjects => setSubjects(subjects))
			.catch(error => console.log(error));
	}, [user]);

	return { subjects, setSubjects };
};

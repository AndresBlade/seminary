import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../login/context/AuthContext';
import { AcademicTerm } from '../interfaces/AcademicTerm';
import { getAcademicTerms } from '../helpers/getAcademicTerms';

export const useAcademicTerms = () => {
	const [academicTerms, setAcademicTerms] = useState<AcademicTerm[] | null>(
		null
	);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		getAcademicTerms(user.token)
			.then(academicTerms => setAcademicTerms(academicTerms))
			.catch(error => console.log(error));
	}, [user]);

	return academicTerms;
};

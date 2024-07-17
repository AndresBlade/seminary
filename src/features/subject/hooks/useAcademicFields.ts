import { useContext, useEffect, useState } from 'react';
import { AcademicField } from '../interfaces/AcademicField';
import { AuthContext } from '../../login/context/AuthContext';
import { getAllAcademicFields } from '../helpers/getAllAcademicFields';

export const useAcademicFields = () => {
	const [academicFields, setAcademicFields] = useState<
		AcademicField[] | null
	>(null);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;

		getAllAcademicFields(user.token)
			.then(academicFields => setAcademicFields(academicFields))
			.catch(error => console.log(error));
	}, [user]);

	return academicFields;
};

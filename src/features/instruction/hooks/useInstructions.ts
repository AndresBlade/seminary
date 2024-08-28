import { useContext, useEffect, useState } from 'react';
import { Instruction } from '../interfaces/Instruction';
import { AuthContext } from '../../login/context/AuthContext';
import { getInstructions } from '../helpers/getInstructions';
import { useAcademicTerms } from './useAcademicTerm';

export const useInstructions = () => {
	const [instructions, setInstructions] = useState<Instruction[] | null>(
		null
	);
	const activeAcademicTerm = useAcademicTerms()?.find(
		academicTerm => academicTerm.status === 'ACTIVO'
	);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		if (!activeAcademicTerm) return;
		getInstructions(user.token)
			.then(instructions =>
				setInstructions(
					instructions.filter(
						instruction =>
							instruction.academic_term_id ===
							activeAcademicTerm?.id
					)
				)
			)
			.catch(error => console.log(error));
	}, [user, activeAcademicTerm]);

	return { instructions, setInstructions };
};

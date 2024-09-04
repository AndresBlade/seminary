import { ReactNode, useEffect, useState } from 'react';
import { ActiveAcademicTermContext } from './ActiveAcademicTermContext';
import { useAcademicTerms } from '../../instruction/hooks/useAcademicTerm';

interface Props {
	children: ReactNode;
}

export const ActiveAcademicTermProvider = ({ children }: Props) => {
	const [isThereActiveAcademicTerm, setIsThereActiveAcademicTerm] =
		useState(false);

	const academicTerms = useAcademicTerms();

	console.log(isThereActiveAcademicTerm);

	useEffect(() => {
		if (!academicTerms) return;
		setIsThereActiveAcademicTerm(
			!!academicTerms.find(
				academicTerm => academicTerm.status === 'ACTIVO'
			)
		);
	}, [academicTerms]);

	return (
		<ActiveAcademicTermContext.Provider
			value={{ isThereActiveAcademicTerm, setIsThereActiveAcademicTerm }}
		>
			{children}
		</ActiveAcademicTermContext.Provider>
	);
};

import { createContext, SetStateAction, Dispatch } from 'react';

interface Props {
	isThereActiveAcademicTerm: boolean;
	setIsThereActiveAcademicTerm: Dispatch<SetStateAction<boolean>>;
}

export const ActiveAcademicTermContext = createContext<Props>({} as Props);

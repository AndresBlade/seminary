import { GetPeriod } from '../interfaces/Period';

export const GetPeriods = (): Promise<GetPeriod[]> => {
	return fetch(`${import.meta.env.VITE_URL}/AcademicTerm/`).then(
		response => response.json() as Promise<GetPeriod[]>
	);
};

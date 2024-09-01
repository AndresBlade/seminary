import { GetPeriod } from '../interfaces/Period';

export const GetPeriods = (): Promise<GetPeriod[]> => {
	return fetch('https://wh1372200.ispot.cc/AcademicTerm/').then(
		response => response.json() as Promise<GetPeriod[]>
	);
};

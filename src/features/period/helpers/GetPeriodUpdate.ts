import { GetPeriod } from '../interfaces/Period';

export const GetPeriodUpdate = ({ id }: { id: number }): Promise<GetPeriod> => {
	return fetch(`${import.meta.env.VITE_URL}/AcademicTerm/${id}`).then(
		response => response.json() as Promise<GetPeriod>
	);
};

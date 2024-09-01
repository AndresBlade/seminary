import { GetPeriod } from '../interfaces/Period';

export const GetPeriodUpdate = ({ id }: { id: number }): Promise<GetPeriod> => {
	return fetch(`https://wh1372200.ispot.cc/AcademicTerm/${id}`).then(
		response => response.json() as Promise<GetPeriod>
	);
};

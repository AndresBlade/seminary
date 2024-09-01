import { GetPeriod } from '../interfaces/Period';

export const FindPeriod = ({
	date,
}: {
	date: string;
}): Promise<GetPeriod[]> => {
	return fetch(`https://wh1372200.ispot.cc/AcademicTerm/?fecha=${date}`).then(
		response => response.json() as Promise<GetPeriod[]>
	);
};

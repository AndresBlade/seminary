import { GetPeriod } from '../interfaces/Period';

export const FindPeriod = ({
	date,
}: {
	date: string;
}): Promise<GetPeriod[]> => {
	return fetch(
		`${import.meta.env.VITE_URL}/AcademicTerm/?fecha=${date}`
	).then(response => response.json() as Promise<GetPeriod[]>);
};

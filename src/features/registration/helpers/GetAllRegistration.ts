import { RegisteredSeminarian } from '../interfaces/interfaces';
export const GetAllRegistration = (): Promise<RegisteredSeminarian[]> => {
	return fetch(
		`${import.meta.env.VITE_URL}/enrollment/seminarian-stage`
	).then(response => response.json() as Promise<RegisteredSeminarian[]>);
};

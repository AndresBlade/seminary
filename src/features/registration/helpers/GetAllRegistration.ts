import { RegisteredSeminarian } from '../interfaces/interfaces';
export const GetAllRegistration = (): Promise<RegisteredSeminarian[]> => {
	return fetch(`https://wh1372200.ispot.cc/enrollment/seminarian-stage`).then(
		response => response.json() as Promise<RegisteredSeminarian[]>
	);
};

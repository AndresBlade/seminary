import { RegisteredSeminarian } from '../interfaces/interfaces';
export const GetAllRegistration = (token:string): Promise<RegisteredSeminarian[]> => {
	return fetch(
		`${import.meta.env.VITE_URL}/enrollment/seminarian-stage`,{
			headers:{
				auth:token
			}
		}
	).then(response => response.json() as Promise<RegisteredSeminarian[]>);
};

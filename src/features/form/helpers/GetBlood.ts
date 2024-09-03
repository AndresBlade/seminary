import { blood } from '../interfaces/Form';

export const GetBlood = (token: string) => {
	return fetch(`${import.meta.env.VITE_URL}/extras/blood/`, {
		headers: {
			auth: token,
		},
	}).then(response => {
		return response.json() as Promise<blood>;
	});
};

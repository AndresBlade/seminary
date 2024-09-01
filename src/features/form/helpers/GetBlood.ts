import { blood } from '../interfaces/Form';

export const GetBlood = (token: string) => {
	return fetch('https://wh1372200.ispot.cc/extras/blood/', {
		headers: {
			auth: token,
		},
	}).then(response => {
		return response.json() as Promise<blood>;
	});
};

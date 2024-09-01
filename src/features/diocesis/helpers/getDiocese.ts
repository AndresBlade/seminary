export interface Diocese {
	id: number;
	name: string;
	holder: string;
}

export const getDiocese = (token: string): Promise<Diocese[]> => {
	return fetch('https://wh1372200.ispot.cc/Diocese/', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Diocese[]>);
};

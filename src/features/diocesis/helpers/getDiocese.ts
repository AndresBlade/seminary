interface Diocese {
	id: number;
	name: string;
	holder: string;
}

export const getDiocese = (token: string): Promise<Diocese[]> => {
	return fetch('http://localhost:3000/Diocese/', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Diocese[]>);
};

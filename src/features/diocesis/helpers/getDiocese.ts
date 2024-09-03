export interface Diocese {
	id: number;
	name: string;
	holder: string;
}

export const getDiocese = (token: string): Promise<Diocese[]> => {
	return fetch(`${import.meta.env.VITE_URL}/Diocese/`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Diocese[]>);
};

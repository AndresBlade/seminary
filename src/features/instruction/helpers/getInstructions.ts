import { Instruction } from '../interfaces/Instruction';

export const getInstructions = (token: string): Promise<Instruction[]> =>
	fetch(`${import.meta.env.VITE_URL}/instruction`, {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Instruction[]>);

import { Instruction } from '../interfaces/Instruction';

export const getInstructions = (token: string): Promise<Instruction[]> =>
	fetch('http://127.0.0.1:3000/instruction', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Instruction[]>);

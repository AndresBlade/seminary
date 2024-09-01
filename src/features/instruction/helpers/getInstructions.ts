import { Instruction } from '../interfaces/Instruction';

export const getInstructions = (token: string): Promise<Instruction[]> =>
	fetch('https://wh1372200.ispot.cc/instruction', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<Instruction[]>);

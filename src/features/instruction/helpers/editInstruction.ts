import { Instruction } from '../interfaces/Instruction';

interface Props {
	instruction: Omit<Instruction, 'subject'>;
	token: string;
}

export const editInstruction = ({ instruction, token }: Props) => {
	console.log(instruction);
	return fetch(`${import.meta.env.VITE_URL}/instruction/`, {
		method: 'PUT',
		mode: 'cors', // no-cors, *cors, same-origin
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify(instruction),
	}).then((response: Response) => {
		console.log(response);
		if (!response.ok) {
			alert(response.statusText);
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}
		return response;
	});
};

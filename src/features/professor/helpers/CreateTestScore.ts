import { TestScoreToSendInterfaces } from '../interfaces/CreateAssessmentsInterfaces';

export async function CreateTestScore({
	data,
	token,
}: {
	data: TestScoreToSendInterfaces;
	token: string;
}) {
	return await fetch(`${import.meta.env.VITE_URL}/testScore/`, {
		method: 'PUT',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-type': 'application/json',
			auth: token,
		},
		body: JSON.stringify(data),
	});
}

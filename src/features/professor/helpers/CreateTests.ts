import { Evaluation } from '../interfaces/CreateAssessmentsInterfaces';

export async function CreateTests({
	subject_id,
	academic_term_id,
	tests,
	token,
}: {
	subject_id: number;
	academic_term_id: number;
	tests: Evaluation[];
	token: string;
}): Promise<Response> {
	console.log(tests);
	const response = await fetch(`${import.meta.env.VITE_URL}/test`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			subject_id: subject_id,
			academic_term_id: academic_term_id,
			tests: tests,
		}),
	});
	return response;
}

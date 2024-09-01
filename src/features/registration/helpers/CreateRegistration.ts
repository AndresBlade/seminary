import { AcademicTerm } from '../interfaces/interfaces';

export async function CreateRegistration({
	idSeminarian,
	subjects,
	AcademicTerm,
	token,
}: {
	idSeminarian: string;
	subjects: number[];
	AcademicTerm: number[] | AcademicTerm[];
	token: string;
}): Promise<Response> {
	const response = await fetch('https://wh1372200.ispot.cc/enrollment/', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			seminarian_id: idSeminarian,
			subject_id: subjects,
			academic_term_id: AcademicTerm[0],
		}),
	});
	return response;
}

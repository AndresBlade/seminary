import { CreatePeriod } from '../interfaces/Period';

export async function CreateAcademicPeriod({
	data,
	token,
}: {
	data: CreatePeriod;
	token: string;
}): Promise<Response> {
	const response = await fetch('https://wh1372200.ispot.cc/AcademicTerm/', {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			start_date: data.start_date,
			end_date: data.end_date,
		}),
	});

	console.log(response);

	return response;
}

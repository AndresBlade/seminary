import { Subject } from '../interfaces/Subject';

interface Props {
	subject: Subject;
	token: string;
}

export const createSubject = ({ subject, token }: Props) => {
	console.log(subject);
	return fetch('https://wh1372200.ispot.cc/subject/', {
		method: 'POST',
		mode: 'cors', // no-cors, *cors, same-origin
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify(subject),
	})
		.then((response: Response) => {
			console.log(response);
			if (!response.ok) {
				alert(response.statusText);
				throw new Error(
					`Error ${response.status}: ${response.statusText}`
				);
			}
			return response;
		})
		.then(response => response.json());
};

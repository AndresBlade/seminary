import { Subject } from '../interfaces/Subject';

interface Props {
	subject: Subject & { id: number; status: boolean };
	token: string;
}

export const editSubject = ({ subject, token }: Props) => {
	console.log(subject);
	return fetch('http://127.0.0.1:3000/subject/', {
		method: 'PUT',
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

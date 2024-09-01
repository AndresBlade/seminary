interface userProps {
	person: {
		id: string;
		forename: string;
		surname: string;
	};
	seminarian: {
		status: string;
	} | null;

	professor: {
		status_id: number;
		instructor: {
			status: number | null;
			instructor_position: string | null;
		};
	} | null;
}

export const GetUsers = (token: string): Promise<userProps[]> => {
	return fetch('https://wh1372200.ispot.cc/user', {
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<userProps[]>);
};

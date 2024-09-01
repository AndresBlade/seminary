export async function UpdateSemester(id: number, token: string) {
	return await fetch(`https://wh1372200.ispot.cc/AcademicTerm/`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			auth: token,
		},
		body: JSON.stringify({
			id: id,
		}),
	});
}

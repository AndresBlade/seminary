export async function UpdateSemester(id: number, token: string) {
	return await fetch(`${import.meta.env.VITE_URL}/AcademicTerm/`, {
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

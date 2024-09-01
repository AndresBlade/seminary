export async function ActivateSemester({
	id,
	token,
}: {
	id: number;
	token: string;
}) {
	return await fetch(
		`https://wh1372200.ispot.cc/AcademicTerm/activate/${id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				auth: token,
			},
		}
	);
}

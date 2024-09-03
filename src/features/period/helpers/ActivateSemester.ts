export async function ActivateSemester({
	id,
	token,
}: {
	id: number;
	token: string;
}) {
	return await fetch(
		`${import.meta.env.VITE_URL}/AcademicTerm/activate/${id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				auth: token,
			},
		}
	);
}

export const getSeminarianListByGrades = (
	token: string,
	academic_term_id: number,
	subject_id: number,
	grade: number
) => {
	console.log(
		`${
			import.meta.env.VITE_URL
		}/test/lista?subject_id=${subject_id}&academic_term_id=${academic_term_id}&note=${grade}&menor_a_la_nota=true`
	);
	return fetch(
		`${
			import.meta.env.VITE_URL
		}/test/lista?subject_id=${subject_id}&academic_term_id=${academic_term_id}&note=${grade}&menor_a_la_nota=true`,
		{ headers: { auth: token } }
	)
		.then(response => response.blob())
		.then(data => window.open(URL.createObjectURL(data)));
};

export const getSeminarianList = (
	token: string,
	diocese_id: number,
	location: 'INTERNO' | 'EXTERNO'
) => {
	return fetch(
		`${
			import.meta.env.VITE_URL
		}/seminarian/seminarianlist?diocese_id=${diocese_id}&location=${location}`,
		{ headers: { auth: token } }
	)
		.then(response => response.blob())
		.then(data => window.open(URL.createObjectURL(data)));
};

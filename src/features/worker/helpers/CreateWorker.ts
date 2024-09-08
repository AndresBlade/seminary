import { dataSentWorker } from "../interfaces/worker";

export async function CreateWorker({data,
	imageFile,
	token,
}:{
	data: dataSentWorker;
	imageFile: File;
	token: string;
}) : Promise<Response> {
	const formData = new FormData();
	formData.append('file', imageFile);
	formData.append('data', JSON.stringify(data));

	const response = await fetch(
		`${import.meta.env.VITE_URL}/worker/${data.persona.id}`,
		{
			method: 'POST',
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				auth: token,
			},
			body: formData,
		}
	);

	return response;
}
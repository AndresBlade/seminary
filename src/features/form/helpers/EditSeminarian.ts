interface seminarian {
	persona: {
		id: string;
		forename: string;
		surname: string;
		email: string;
		birthdate: string;
		medical_record: string | null;
		BloodType: string;
		phone: {
			phone_number: string;
			description: string | null;
		}[];
		social: {
			social_media_category: number;
			link: string;
		}[];
	};
	user:
		| {
				degree: [
					{
						description: string;
						link: string;
					}
				];
				parish_id: number;
		  }
		| object;
	ForeingSeminarian?:
		| {
				seminary_name: string;
				stage: string;
				stage_year: number;
		  }
		| null
		| object;
	location: string | undefined;
	apostleships: string | undefined;
	ministery: string | undefined;

	stage: string | undefined;
}

async function EditSeminarian({
	data,
	imageFile,
	token,
}: {
	data: seminarian;
	imageFile: File;
	token: string;
}): Promise<Response> {
	const formData = new FormData();
	formData.append('picture', imageFile);
	formData.append('data', JSON.stringify(data));

	const response = await fetch(
		`${import.meta.env.VITE_URL}/seminarian/update/${data.persona.id}`,
		{
			method: 'PUT',
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

export { EditSeminarian };

interface professor {
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
				parish_id: number;
				degree: {
					description: string;
					link: string;
				}[];
		  }
		| object;
	instructor:
		| {
				is_instructor: boolean;
				starting_date: string | null;
				instructor_position: string | null;
		  }
		| object
		| undefined;
}

async function CreateProfessor({
	data,
	imageFile,
	token,
}: {
	data: professor;
	imageFile: File;
	token: string;
}): Promise<Response> {
	const formData = new FormData();
	formData.append('file', imageFile);
	formData.append('data', JSON.stringify(data));

	const response = await fetch(
		`${import.meta.env.VITE_URL}/professor/${data.persona.id}`,
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

export { CreateProfessor };

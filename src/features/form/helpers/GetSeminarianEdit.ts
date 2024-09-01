interface seminarian {
	id: string;
	apostleships: string;
	location: string;
	Ministery?: string;
	status: string;
	parish_id: number;
	diocesi_id: number;
	degrees?: [
		{
			id: number;
			description: string;
			link: string;
			user_id: string;
		}
	];
	person: {
		id: string;
		profile_picture_path: string;
		forename: string;
		surname: string;
		email: string;
		birthdate: string;
		medical_record: string;
		BloodType: string;
		cellpones: [
			{
				phone_number: string;
				description: string;
			},
			{
				phone_number: string;
				description: string;
			}
		];
		medias: [
			{
				social_media_category: number;
				link: string;
			}
		];
		date_String: string;
	};
	foreing_Data?: {
		seminary_name: string;
		stage: string;
		stage_year: number;
	};
}

export function GetSeminarianEdit(
	id: string,
	token: string
): Promise<seminarian[]> {
	return fetch(`https://wh1372200.ispot.cc/seminarian/getsem?id=${id}`, {
		headers: {
			auth: token,
		},
	}).then(response => {
		return response.json() as Promise<seminarian[]>;
	});
}

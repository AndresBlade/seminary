// interface userProps{
//     person:{
//         id:string
//         forename:string
//         surname:string
//     }
//     seminarian:{
//         status:string
//     } | null

//     professor:{
//         status_id:number
//         instructor:{
//         status:number | null
//         instructor_position: string | null
//         }
//     } | null
// }

export interface userPropsWrapper {
	msj: string;
	user: {
		person: {
			id: string;
			forename: string;
			surname: string;
		};
		seminarian: {
			status: string;
		} | null;

		professor: {
			status_id: number;
			instructor: {
				status: number | null;
				instructor_position: string | null;
			};
		} | null;
	};
}

export const GetUserFind = ({
	data,
	token,
}: {
	data: string;
	token: string;
}): Promise<userPropsWrapper> => {
	return fetch(`${import.meta.env.VITE_URL}/user/${data}`, {
		method: 'GET',
		headers: {
			auth: token,
		},
	}).then(response => response.json() as Promise<userPropsWrapper>);
};

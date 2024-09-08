import { SeminarianByStage } from '../interfaces/interfaces';
export const GetSeminarianByStage = ({
	stage,
	token
}: {
	stage: string;
	token: string;
}): Promise<SeminarianByStage[]> => {
	return fetch(
		`${
			import.meta.env.VITE_URL
		}/enrollment/seminarian-stage/?stage=${stage}`,{
			headers:{
				auth:token
			}
		}
	).then(response => response.json() as Promise<SeminarianByStage[]>);
};

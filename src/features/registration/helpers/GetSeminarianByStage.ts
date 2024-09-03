import { SeminarianByStage } from '../interfaces/interfaces';
export const GetSeminarianByStage = ({
	stage,
}: {
	stage: string;
	token: string;
}): Promise<SeminarianByStage[]> => {
	return fetch(
		`${
			import.meta.env.VITE_URL
		}/enrollment/seminarian-stage/?stage=${stage}`
	).then(response => response.json() as Promise<SeminarianByStage[]>);
};

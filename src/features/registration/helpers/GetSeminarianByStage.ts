import { SeminarianByStage } from '../interfaces/interfaces';
export const GetSeminarianByStage = ({
	stage,
}: {
	stage: string;
	token: string;
}): Promise<SeminarianByStage[]> => {
	return fetch(
		`https://wh1372200.ispot.cc/enrollment/seminarian-stage/?stage=${stage}`
	).then(response => response.json() as Promise<SeminarianByStage[]>);
};

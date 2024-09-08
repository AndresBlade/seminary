import { TestsSubject } from '../interfaces/CreateAssessmentsInterfaces';

export const GetTestsSubject = ({
	id,
	academic_term_id,
	token
}: {
	id: number;
	academic_term_id: number;
	token:string
}): Promise<TestsSubject[]> => {
	return fetch(
		`${
			import.meta.env.VITE_URL
		}/test/?subject_id=${id}&academic_term_id=${academic_term_id}`,{
			headers:{
				auth:token
			}
		}
	).then(response => response.json() as Promise<TestsSubject[]>);
};

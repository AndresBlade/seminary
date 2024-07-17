import { AcademicField } from '../interfaces/AcademicField';

export const getAllAcademicFields = (token: string): Promise<AcademicField[]> =>
	fetch('http://127.0.0.1:3000/subject/fields', {
		headers: { auth: token },
	}).then(response => response.json() as Promise<AcademicField[]>);

import { AcademicField } from '../interfaces/AcademicField';

export const getAllAcademicFields = (token: string): Promise<AcademicField[]> =>
	fetch('https://wh1372200.ispot.cc/subject/fields', {
		headers: { auth: token },
	}).then(response => response.json() as Promise<AcademicField[]>);

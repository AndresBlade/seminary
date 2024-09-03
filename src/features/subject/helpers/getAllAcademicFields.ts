import { AcademicField } from '../interfaces/AcademicField';

export const getAllAcademicFields = (token: string): Promise<AcademicField[]> =>
	fetch(`${import.meta.env.VITE_URL}/subject/fields`, {
		headers: { auth: token },
	}).then(response => response.json() as Promise<AcademicField[]>);

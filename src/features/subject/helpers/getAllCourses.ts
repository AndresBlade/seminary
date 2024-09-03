import { Course } from '../interfaces/Course';

export const getAllCourses = (): Promise<Course[]> =>
	fetch(`${import.meta.env.VITE_URL}/course`).then(
		response => response.json() as Promise<Course[]>
	);

import { Course } from '../interfaces/Course';

export const getAllCourses = (): Promise<Course[]> =>
	fetch('http://127.0.0.1:3000/course').then(
		response => response.json() as Promise<Course[]>
	);

import { Course } from '../interfaces/Course';

export const getAllCourses = (): Promise<Course[]> =>
	fetch('https://wh1372200.ispot.cc/course').then(
		response => response.json() as Promise<Course[]>
	);

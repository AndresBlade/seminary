import { useEffect, useState } from 'react';
import { Course } from '../interfaces/Course';
import { getAllCourses } from '../helpers/getAllCourses';

export const useCourses = () => {
	const [courses, setCourses] = useState<Course[] | null>(null);

	useEffect(() => {
		getAllCourses()
			.then(courses => setCourses(courses))
			.catch(error => console.log(error));
	}, []);

	return courses;
};

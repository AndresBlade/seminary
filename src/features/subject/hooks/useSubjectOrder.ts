import { useEffect, useRef, useState } from 'react';
import { OrderStage } from '../interfaces/OrderStage';
import { useSubjects } from './useSubjects';
import { OrderableColumnValues } from '../interfaces/OrderableColumnValues';
import { SubjectFromDB } from '../interfaces/SubjectFromDB';

export const useSubjectOrder = () => {
	const { subjects, setSubjects } = useSubjects();

	const originalSubjects = useRef<SubjectFromDB[] | null>(null);

	const [order, setOrder] = useState<OrderableColumnValues>({
		name: 'name',
		stage: 1,
	});
	const [subjectsSetToDefault, setSubjectsSetToDefault] = useState(false);

	console.log(subjects);

	console.log(order);

	console.log(originalSubjects.current);

	const handleOrderChange = (name: string) => {
		setOrder(order => ({
			name,
			stage: (order.stage !== 2 ? order.stage + 1 : 1) as OrderStage,
		}));
	};

	useEffect(() => {
		if (subjectsSetToDefault) return;
		setSubjects(originalSubjects.current);
		setOrder({ name: 'name', stage: 1 });
	}, [setSubjects, subjectsSetToDefault]);

	useEffect(() => {
		if (originalSubjects.current) return;
		if (subjects && subjectsSetToDefault)
			originalSubjects.current = subjects;
	}, [subjects, subjectsSetToDefault]);

	useEffect(() => {
		if (subjects && !subjectsSetToDefault) {
			setSubjects(subjects => {
				if (!subjects) return null;
				const subjectsCopy = [...subjects];
				subjectsCopy.sort((a, b) =>
					a.description < b.description
						? -1
						: a.description > b.description
						? 1
						: 0
				);

				return subjectsCopy;
			});
			setSubjectsSetToDefault(true);
		}
	}, [setSubjects, subjects, subjectsSetToDefault]);

	useEffect(() => {
		if (order.name !== 'name') return;

		if (order.stage === 1)
			return setSubjects(subjects => {
				if (!subjects) return null;
				const subjectsCopy = [...subjects];
				subjectsCopy.sort((a, b) =>
					a.description < b.description
						? -1
						: a.description > b.description
						? 1
						: 0
				);

				return subjectsCopy;
			});

		return setSubjects(subjects => {
			if (!subjects) return null;
			const subjectsCopy = [...subjects];
			subjectsCopy.sort((a, b) =>
				a.description < b.description
					? -1
					: a.description > b.description
					? 1
					: 0
			);
			subjectsCopy.reverse();

			return subjectsCopy;
		});
	}, [order.name, order.stage, setSubjects]);

	useEffect(() => {
		if (order.name !== 'course') return;

		if (order.stage === 1)
			return setSubjects(subjects => {
				if (!subjects) return null;
				const subjectsCopy = [...subjects];
				subjectsCopy.sort((a, b) => a.course_id - b.course_id);

				return subjectsCopy;
			});

		return setSubjects(subjects => {
			if (!subjects) return null;
			const subjectsCopy = [...subjects];
			subjectsCopy.sort((a, b) => a.course_id - b.course_id);
			subjectsCopy.reverse();

			return subjectsCopy;
		});
	}, [order.name, order.stage, setSubjects]);

	useEffect(() => {
		if (order.name !== 'semester') return;

		if (order.stage === 1)
			return setSubjects(subjects => {
				if (!subjects) return null;
				const subjectsCopy = [...subjects];
				subjectsCopy.sort((a, b) => a.semester - b.semester);

				return subjectsCopy;
			});

		return setSubjects(subjects => {
			if (!subjects) return null;
			const subjectsCopy = [...subjects];
			subjectsCopy.sort((a, b) => a.semester - b.semester);
			subjectsCopy.reverse();

			return subjectsCopy;
		});
	}, [order.name, order.stage, setSubjects]);

	return {
		subjects,
		setSubjects,
		handleOrderChange,
		order,
		originalSubjects: originalSubjects.current,
		setSubjectsSetToDefault,
	};
};

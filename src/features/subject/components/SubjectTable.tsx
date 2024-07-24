import { ContentContainer } from '../../ui/container/components/ContentContainer';

import DeleteIcon from '../../../assets/deleteIcon.svg';
import EditIcon from '../../../assets/editIcon.svg';
import { TableColumn } from './TableColumn';
import TableCSS from '../styles/Table.module.css';
import { useSubjects } from '../hooks/useSubjects';
import { useContext, useEffect, useRef, useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useNavigate } from 'react-router-dom';
import { OrderStage } from '../interfaces/OrderStage';
import { deleteSubject } from '../helpers/deleteSubject';
import { getAllSubjects } from '../helpers/getAllSubjects';
import { AuthContext } from '../../login/context/AuthContext';

interface OrderableColumnValues {
	name: string | null;
	stage: OrderStage;
}

export const SubjectTable = () => {
	const { user } = useContext(AuthContext);
	const { subjects, setSubjects } = useSubjects();
	const coursesFromDB = useCourses();
	const navigate = useNavigate();
	const subjectsSetToDefault = useRef(false);

	const [order, setOrder] = useState<OrderableColumnValues>({
		name: '',
		stage: 0,
	});
	const names = subjects?.map(subject => subject.description);
	const courses = subjects?.map(
		subject =>
			coursesFromDB?.find(course => course.id === subject.course_id)
				?.description
	) as string[];

	const semesters = subjects?.map(subject =>
		subject.semester === 1 ? 'Primero' : 'Segundo'
	);
	const ids = subjects?.map(subject => subject.id.toString());

	const handleOrderChange = (name: string) => {
		setOrder(order => ({
			name,
			stage: (order.stage !== 2 ? order.stage + 1 : 1) as OrderStage,
		}));
	};

	useEffect(() => {
		if (subjects && !subjectsSetToDefault.current) {
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
			subjectsSetToDefault.current = true;
		}
	}, [setSubjects, subjects]);

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

	return (
		<ContentContainer>
			<div className={TableCSS.table}>
				{names && (
					<TableColumn
						title="Nombre"
						type="content"
						orderable
						onClick={() => handleOrderChange('name')}
						content={names}
						stage={order.name === 'name' ? order.stage : 0}
					/>
				)}
				{courses && (
					<TableColumn
						title="Curso"
						type="content"
						content={courses}
						orderable
						onClick={() => handleOrderChange('course')}
						stage={order.name === 'course' ? order.stage : 0}
					/>
				)}

				{semesters && (
					<TableColumn
						title="Semestre"
						type="content"
						content={semesters}
						orderable
						onClick={() => handleOrderChange('semester')}
						stage={order.name === 'semester' ? order.stage : 0}
					/>
				)}
				{ids && (
					<TableColumn type="element" title="Acciones">
						{ids.map(id => (
							<div key={id} className={TableCSS.cell}>
								<button className={TableCSS.action}>
									<img
										src={EditIcon}
										alt="Editar Materia"
										onClick={() => navigate(`${id}`)}
									/>
								</button>
								<button
									className={TableCSS.action}
									onClick={() => {
										if (!user) return;
										deleteSubject(Number(id), user.token)
											.then(response => {
												if (response.status === 403)
													return Promise.reject(
														response
													);
												return getAllSubjects(
													user.token
												);
											})
											.then(subjects => {
												setSubjects(subjects);
												subjectsSetToDefault.current =
													false;
											})
											.catch((response: Response) =>
												response.text()
											)
											.then(error => {
												if (!error) return;
												const errorText = `La materia no puede ser eliminada, puesto que precede a${
													error.split('precents')[1]
												}`;
												alert(errorText);
											})
											.catch(error => console.log(error));
									}}
								>
									<img
										src={DeleteIcon}
										alt="Eliminar Materia"
									/>
								</button>
							</div>
						))}
					</TableColumn>
				)}
			</div>
		</ContentContainer>
	);
};

import { ContentContainer } from '../../ui/container/components/ContentContainer';

import DeleteIcon from '../../../assets/deleteIcon.svg';
import EditIcon from '../../../assets/editIcon.svg';
import { TableColumn } from './TableColumn';
import TableCSS from '../styles/Table.module.css';
import { useSubjects } from '../hooks/useSubjects';
import { useEffect, useRef, useState } from 'react';
import { SubjectFromDB } from '../interfaces/SubjectFromDB';
import { TableHeaderRow } from './TableHeaderRow';
import { TableHeader } from './TableHeader';
import { Cell } from './Cell';
import { TableRow } from './TableRow';
import { Rows } from './Rows';
import { useCourses } from '../hooks/useCourses';
import { useNavigate } from 'react-router-dom';

interface OrderableColumnValues {
	name: string | null;
	stage: 0 | 1 | 2;
}

export const SubjectTable = () => {
	const { subjects, setSubjects } = useSubjects();
	const courses = useCourses();
	const originalSubjects = useRef<SubjectFromDB[] | null>(null);
	const navigate = useNavigate();

	const [order, setOrder] = useState<OrderableColumnValues>({
		name: null,
		stage: 1,
	});

	useEffect(() => {
		if (!originalSubjects.current) {
			originalSubjects.current = subjects;
			console.log('repitazo');
		}
	}, [subjects]);
	return (
		<ContentContainer>
			<div className={TableCSS.table}>
				<TableHeaderRow>
					<TableHeader
						title="Nombre"
						orderable
						onClick={() => console.log('ordernando 1')}
					/>
					<TableHeader title="Curso" />
					<TableHeader title="Semestre" />
					<TableHeader title="Acciones" />
				</TableHeaderRow>
				<Rows>
					{subjects?.map((subject, index) => (
						<TableRow key={index}>
							<Cell>{subject.description}</Cell>
							<Cell>
								{
									courses?.find(
										course =>
											course.id === subject.course_id
									)?.description
								}
							</Cell>
							<Cell>
								{subject.semester === 1 ? 'Primero' : 'Segundo'}
							</Cell>
							<Cell>
								<div className={TableCSS.actions}>
									<button
										className={TableCSS.action}
										onClick={() => {
											navigate(`${subject.id}`);
										}}
									>
										<img src={EditIcon} alt="Editar" />
									</button>
									<button className={TableCSS.action}>
										<img src={DeleteIcon} alt="Eliminar" />
									</button>
								</div>
							</Cell>
						</TableRow>
					))}
				</Rows>
				{/* {names && (
					<TableColumn
						title="Nombre"
						type="content"
						content={names}
						orderable
						onClick={() => {
							setOrder()
							// if (order.stage === 1) {
							// 	setSubjects(subjects => {
							// 		if (!subjects) return subjects;
							// 		const subjectsCopy = [...subjects];
							// 		subjectsCopy.sort();
							// 		return subjectsCopy;
							// 	})
							// 	setOrder()
							// }
						}}
						upAction={() =>
							setSubjects(subjects => {
								if (!subjects) return subjects;
								const subjectsCopy = [...subjects];
								subjectsCopy.sort();
								return subjectsCopy;
							})
						}
						downAction={() =>
							setSubjects(subjects => {
								if (!subjects) return subjects;
								const subjectsCopy = [...subjects];
								subjectsCopy.reverse();
								return subjectsCopy;
							})
						}
						defaultAction={() =>
							setSubjects(originalSubjects.current)
						}
					/>
				)}
				{courses && (
					<TableColumn
						title="Curso"
						type="content"
						content={courses}
					/>
				)} */}
			</div>
		</ContentContainer>
	);
};

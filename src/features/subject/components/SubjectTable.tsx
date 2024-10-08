import DeleteIcon from '../../../assets/deleteIcon.svg';
import EditIcon from '../../../assets/editIcon.svg';
import { TableColumn } from './TableColumn';
import TableCSS from '../styles/Table.module.css';
import { useContext } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useNavigate } from 'react-router-dom';
import { deleteSubject } from '../helpers/deleteSubject';
import { getAllSubjects } from '../helpers/getAllSubjects';
import { AuthContext } from '../../login/context/AuthContext';
import { SubjectFromDB } from '../interfaces/SubjectFromDB';
import { OrderableColumnValues } from '../interfaces/OrderableColumnValues';

interface Props {
	subjects: SubjectFromDB[] | null;
	setSubjects: React.Dispatch<React.SetStateAction<SubjectFromDB[] | null>>;
	handleOrderChange: (name: keyof SubjectFromDB) => void;
	order: OrderableColumnValues<SubjectFromDB>;
	setSubjectsSetToDefault: React.Dispatch<React.SetStateAction<boolean>>;
	setOriginalSubjects: React.Dispatch<
		React.SetStateAction<SubjectFromDB[] | null>
	>;
}

export const SubjectTable = ({
	subjects,
	setSubjects,
	handleOrderChange,
	order,
	setSubjectsSetToDefault,
	setOriginalSubjects,
}: Props) => {
	const { user } = useContext(AuthContext);
	const coursesFromDB = useCourses();

	const navigate = useNavigate();

	const names = subjects?.map(subject => subject.description);
	const courses = subjects?.map(
		subject =>
			coursesFromDB?.find(course => course.id === subject.course_id)
				?.description
	) as string[];

	const semesters = subjects?.map(subject =>
		subject.semester === 1 ? 'PRIMERO' : 'SEGUNDO'
	);
	const ids = subjects?.map(subject => subject.id.toString());

	const classNames = subjects?.map(subject =>
		subject.status ? TableCSS.cell : TableCSS.deactivatedCell
	);

	return (
		<>
			<div className={TableCSS.table}>
				{names && (
					<TableColumn
						title="Nombre"
						type="content"
						orderable
						onClick={() => handleOrderChange('description')}
						content={names}
						stage={order.name === 'description' ? order.stage : 0}
						classNames={classNames}
					/>
				)}
				{courses && (
					<TableColumn
						title="Curso"
						type="content"
						content={courses}
						orderable
						onClick={() => handleOrderChange('course_id')}
						stage={order.name === 'course_id' ? order.stage : 0}
						classNames={classNames}
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
						classNames={classNames}
					/>
				)}
				{ids && (
					<TableColumn type="element" title="Acciones">
						{ids.map((id, index) => (
							<div key={id} className={classNames?.[index]}>
								{subjects?.[index].status ? (
									<>
										<button className={TableCSS.action}>
											<img
												src={EditIcon}
												alt="Editar Materia"
												onClick={() =>
													navigate(`${id}`)
												}
											/>
										</button>
										<button
											className={TableCSS.action}
											onClick={() => {
												if (!user) return;
												deleteSubject(
													Number(id),
													user.token
												)
													.then(response => {
														if (
															response.status ===
															403
														)
															return Promise.reject(
																response
															);
														return getAllSubjects(
															user.token
														);
													})
													.then(subjects => {
														setSubjects(subjects);
														setOriginalSubjects(
															subjects
														);
														setSubjectsSetToDefault(
															false
														);
													})
													.catch(
														(response: Response) =>
															response.text()
													)
													.then(error => {
														if (!error) return;
														const errorText = `La materia no puede ser eliminada, puesto que precede a${
															error.split(
																'precents'
															)[1]
														}`;
														alert(errorText);
													})
													.catch(error =>
														console.log(error)
													);
											}}
										>
											<img
												src={DeleteIcon}
												alt="Eliminar Materia"
											/>
										</button>
									</>
								) : (
									<button
										className={TableCSS.activateAction}
										onClick={() => {
											const subject = subjects?.[index];
											if (!subject) return;
											if (!user) return;
											deleteSubject(
												Number(id),
												user.token
											)
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
													setOriginalSubjects(
														subjects
													);
													setSubjectsSetToDefault(
														false
													);
												})
												.catch((response: Response) =>
													response.text()
												)
												.then(error => {
													if (!error) return;
													const errorText = `La materia no puede ser eliminada, puesto que precede a${
														error.split(
															'precents'
														)[1]
													}`;
													alert(errorText);
												})
												.catch(error =>
													console.log(error)
												);
										}}
									>
										ACTIVAR
									</button>
								)}
							</div>
						))}
					</TableColumn>
				)}
			</div>
		</>
	);
};

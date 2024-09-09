import CreateAssessmentsStyles from '../style/CreateAssessments.module.css';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import DataHeader from '../../period/components/DataHeader';
import DataContent from '../../period/components/DataContent';
import {
	Evaluation,
	TestsSubject,
} from '../interfaces/CreateAssessmentsInterfaces';
import Modal from '../../period/components/Modal';
import Input from '../../period/components/Input';
import closeModal from '../../../assets/MaterialSymbolsClose.svg';
import { useContext, useState, useEffect } from 'react';
import { SelectForm } from '../../form/components/small_components/SelectForm';
import { AuthContext } from '../../login/context/AuthContext';
import { GetSubjects } from '../helpers/GetSubjects';
import { Subjects } from '../interfaces/CreateAssessmentsInterfaces';
import { CreateTests } from '../helpers/CreateTests';
import { GetTestsSubject } from '../helpers/GetTestsSubject';
import { useAcademicTerms } from '../../instruction/hooks/useAcademicTerm';

export const CreateAssessments = () => {
	const { user } = useContext(AuthContext);
	const idUser = user?.person_id;
	const [data, setData] = useState<Subjects[]>([]);
	const [error, setError] = useState(false);
	const [evaluationsToShow, setEvaluationsToShow] = useState<TestsSubject[]>(
		[]
	);

	const academicTerms = useAcademicTerms();
	const academicTermActiveToSend = academicTerms?.find(
		academicTerm => academicTerm.status === 'ACTIVO'
	)?.id;
	// const academicTermActiveToSend = academicTermActive
	// ? academicTermActive
	//     .filter((academicTerm) => academicTerm.status === "ACTIVO")
	//     .map((academicTerm) => academicTerm.id)
	// : [0];
	const subjectsProfessor = data?.filter(subject =>
		subject.instruction.some(
			instruction =>
				instruction.academic_term_id === academicTermActiveToSend &&
				instruction.professor_id === idUser
		)
	);
	console.log(subjectsProfessor);
	const [showModal, setShowModal] = useState(false);
	const [evaluations, setEvaluations] = useState([
		{ description: ''.toUpperCase(), maximum_score: 0 },
		{ description: ''.toUpperCase(), maximum_score: 0 },
	]);
	const [descriptionIsNull, setDescriptionIsNull]=useState(true)
	const [subjectSelected, setSubjectSelected] = useState(0);
	const handleAddEvaluation = () => {
		if (evaluations.length < 6) {
			setEvaluations([
				...evaluations,
				{ description: '', maximum_score: 0 },
			]);
		}
	};
	const handleRemoveEvaluation = (index: number) => {
		if (evaluations.length > 2) {
			setEvaluations(evaluations.filter((_, i) => i !== index));
		}
	};
	const handleDescriptionChange = (index: number, value: string) => {
		const newEvaluations = [...evaluations];
		newEvaluations[index].description = value;
		setEvaluations(newEvaluations);
	};

	const handleScoreChange = (index: number, value: number) => {
		const newEvaluations = [...evaluations];
		newEvaluations[index].maximum_score = value;
		setEvaluations(newEvaluations);
	};
	const calculateTotalScore = (
		evaluations: Evaluation[] | TestsSubject[]
	) => {
		let total = 0;
		evaluations.length > 0
			? evaluations.forEach(evaluations => {
					if (evaluations?.maximum_score !== undefined) {
						total += evaluations.maximum_score;
					}
			  })
			: (total = 0);
		return total;
	};

	const totalScore = ~~calculateTotalScore(evaluations) ?? 0;
	const TotalScoreSubjectResgistered =
		calculateTotalScore(evaluationsToShow) ?? 0;

	useEffect(()=>{
		setDescriptionIsNull(evaluations.some(evaluation=>
			!evaluation.description
		))
	},[evaluations])
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user?.token) return;
		if (!academicTermActiveToSend) return;
		CreateTests({
			subject_id: subjectSelected,
			academic_term_id: academicTermActiveToSend,
			tests: evaluations,
			token: user.token,
		})
			.then(response => {
				if (response.ok) {
					alert('Evaluaciones registradas correctamente');
					setShowModal(false);
					GetTestsSubject({
						id: subjectSelected,
						academic_term_id: academicTermActiveToSend,
						token:user.token
					})
						.then(response => {
							setEvaluationsToShow(response);
						})
						.catch(error => {
							setError(true);
							console.log(error);
							alert(
								'Error al mostrar las evaluaciones registradas'
							);
						});
				}
			})
			.catch(error => {
				console.log(error);
				alert('Error al registrar las evaluaciones');
			});
	};

	useEffect(() => {
		if(!user?.token)return
		if (subjectSelected !== 0) {
			if (!academicTermActiveToSend) return;
			GetTestsSubject({
				id: subjectSelected,
				academic_term_id: academicTermActiveToSend,
				token:user.token
			})
				.then(response => {
					setEvaluationsToShow(response);
				})
				.catch(error => {
					setError(true);
					console.log(error);
					alert('Error al mostrar las evaluaciones registradas');
				});
		}

		GetSubjects(user.token)
			.then(response => {
				setData(response);
			})
			.catch(error => {
				console.log(error);
				alert('Error al mostrar las materias que imparte');
			});
		if (subjectSelected === 0) {
			setEvaluationsToShow([]);
		}
	}, [subjectSelected, academicTermActiveToSend]);

	console.log({ evaluations });

	return (
		<ContentContainer>
			<div className={CreateAssessmentsStyles.selectSubject}>
				<SelectForm
					value={subjectSelected}
					onChange={e => setSubjectSelected(parseInt(e.target.value))}
				>
					<option value="0" selected>
						Seleccionar materia
					</option>
					{subjectsProfessor?.map(subject => (
						<option value={subject.id} key={subject.id}>
							{subject.description}
						</option>
					))}
				</SelectForm>
			</div>
			<div className={CreateAssessmentsStyles.addNewEvaluationContainer}>
				<h2>Lista de evaluaciones</h2>

				<button
					disabled={
						subjectSelected === 0 ||
						TotalScoreSubjectResgistered === 100
					}
					className={CreateAssessmentsStyles.buttonAddNewEvaluation}
					onClick={e => {
						e.preventDefault();
						setShowModal(true);
					}}
				>
					Agregar nuevo
				</button>
			</div>
			<DataHeader>
				<p>Descripción</p>
				<p className={CreateAssessmentsStyles.scoreTitle}>%</p>
			</DataHeader>
			{error ? (
				<p>Error al traer los datos</p>
			) : evaluationsToShow.length === 0 ? (
				<p>No hay evaluaciones para mostrar</p>
			) : (
				evaluationsToShow?.map(test => (
					<DataContent
						key={test.id}
						className={CreateAssessmentsStyles.testShow}
					>
						<p>{test.description}</p>
						<p>{test.maximum_score}</p>
					</DataContent>
				))
			)}
			<div>
				<p>Total:{TotalScoreSubjectResgistered}%</p>
			</div>

			{showModal === true ? (
				<Modal setShowModal={setShowModal}>
					<form
						action="POST"
						onSubmit={handleSubmit}
						className={CreateAssessmentsStyles.dataAddNewEvaluation}
					>
						<h3>Agregar evaluación</h3>
						{evaluations.map((evaluation, index) => (
							<div
								key={index}
								className={
									CreateAssessmentsStyles.cardEvaluation
								}
							>
								<div
									className={
										CreateAssessmentsStyles.cardEvaluationHeader
									}
								>
									<p>Descripción</p>
									{evaluations.length > 2 && (
										<button
											onClick={() =>
												handleRemoveEvaluation(index)
											}
										>
											<img src={closeModal} alt="" />
										</button>
									)}
								</div>
								<Input
									placeholder="Exámen"
									type="text"
									value={evaluation.description.toUpperCase()}
									onChange={e =>
										handleDescriptionChange(
											index,
											e.target.value.toUpperCase()
										)
									}
								/>
								<p>Ponderación</p>
								<Input
									placeholder="20"
									type="number"
									min={0}
									value={evaluation.maximum_score}
									onChange={e =>
										handleScoreChange(
											index,
											parseFloat(e.target.value)
										)
									}
								/>
							</div>
						))}
						{evaluations.length < 6 && totalScore < 100 && (
							<button
								type="button"
								onClick={handleAddEvaluation}
								className={CreateAssessmentsStyles.buttonAdd}
							>
								Agregar Evaluación
							</button>
						)}
						<button
							type="submit"
							disabled={totalScore !== 100 || descriptionIsNull}
							className={CreateAssessmentsStyles.buttonSave}
							onClick={() => {
								setShowModal(false)
							}}
						>
							Guardar
						</button>
					</form>
				</Modal>
			) : null}
		</ContentContainer>
	);
};

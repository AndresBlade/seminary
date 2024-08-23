import { useContext, useState } from 'react';
import { TableColumn } from '../../subject/components/TableColumn';
import { useOrder } from '../../subject/hooks/useOrder';
import TableCSS from '../../subject/styles/Table.module.css';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { useInstructions } from '../hooks/useInstructions';
import { useProfessors } from '../hooks/useProfessors';
import { AssignButton } from './AssignButton';
import { ProfessorSelect } from './ProfessorSelect';
import { useAcademicTerms } from '../hooks/useAcademicTerm';
import { AuthContext } from '../../login/context/AuthContext';
import { editInstruction } from '../helpers/editInstruction';
import { getInstructions } from '../helpers/getInstructions';

export const Table = () => {
	const { user } = useContext(AuthContext);

	const {
		instructions: instructionsFromDB,
		setInstructions: setInstructionsFromDB,
	} = useInstructions();

	const {
		value: instructions,
		setValue: setInstructions,
		order,
		handleOrderChange,
		setOriginalValue,
		setValueSetToDefault,
	} = useOrder({
		value: instructionsFromDB,
		setValue: setInstructionsFromDB,
		name: 'subject',
		stage: 0,
	});

	const activeAcademicTerm = useAcademicTerms()?.find(
		academicTerm => academicTerm.status === 'ACTIVO'
	);

	const [professorSelect, setProfessorSelect] = useState<{
		isShowing: boolean;
		subjectId: number | null;
	}>({ isShowing: false, subjectId: null });

	const professors = useProfessors();
	const names = instructions?.map(instruction => instruction.subject);
	return (
		<ContentContainer>
			<div className={TableCSS.table}>
				{names && (
					<TableColumn
						orderable
						title="Materia"
						type="content"
						stage={order.stage}
						content={names}
						onClick={() => handleOrderChange('subject')}
					/>
				)}
				{instructions && professors && (
					<TableColumn type="element" title="Profesor">
						{instructions?.map((instruction, index) => (
							<div className={TableCSS.cell} key={index}>
								{(professorSelect.isShowing &&
									instruction.subject_id ===
										professorSelect.subjectId) ||
								instruction.professor_id ? (
									<ProfessorSelect
										instruction={instruction}
										professors={professors}
										handleChange={e => {
											user &&
												editInstruction({
													instruction: {
														...instruction,
														professor_id:
															e.target.value,
													},
													token: user.token,
												})
													.then(() =>
														getInstructions(
															user.token
														)
													)
													.then(instructions => {
														const activeInstructions =
															instructions.filter(
																instruction =>
																	instruction.academic_term_id ===
																	activeAcademicTerm?.id
															);
														setInstructions(
															activeInstructions
														);
														setOriginalValue(
															activeInstructions
														);
														setValueSetToDefault(
															false
														);
													})
													.catch(err =>
														console.log(err)
													);
										}}
									/>
								) : (
									<AssignButton
										handleClick={() =>
											setProfessorSelect({
												isShowing: true,
												subjectId:
													instruction.subject_id,
											})
										}
									/>
								)}
							</div>
						))}
					</TableColumn>
				)}
			</div>
		</ContentContainer>
	);
};

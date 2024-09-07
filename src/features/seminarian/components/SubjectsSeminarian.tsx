import SeminarianCSS from '../styles/seminarianCSS.module.css';
import {
	GetAcademicTermSeminarianInterfaces,
	NotesBySubjectSeminarianInterfaces,
} from '../interfaces/seminarian';
import React, { SetStateAction } from 'react';
import showScores from '../../../assets/material-symbols--visibility-rounded.png';
interface SubjectsSeminarianProps {
	notesByPeriod: NotesBySubjectSeminarianInterfaces[] | null;
	setScoreDetailsBySubject: React.Dispatch<SetStateAction<number>>;
	setShowModal: React.Dispatch<SetStateAction<boolean>>;
	dataAcademicTerm: GetAcademicTermSeminarianInterfaces | null;
}

const SubjectsSeminarian = ({
	notesByPeriod,
	setScoreDetailsBySubject,
	setShowModal,
}: SubjectsSeminarianProps) => {
	return (
		<div className={SeminarianCSS.subjectListSeminarian}>
			<div className={SeminarianCSS.subjectListHeader}>
				<p className={SeminarianCSS.subjectHeader}>Materia</p>
				<div className={SeminarianCSS.scoreHeader}>
					<p className={SeminarianCSS.scoreHeader}>Notas</p>
					<p>Ver notas</p>
				</div>
			</div>
			{notesByPeriod && (
				<div className={SeminarianCSS.stagePeriod}>
					<p>
						{notesByPeriod[0].enrollment[0].start_date.slice(0, 4) +
							'-' +
							notesByPeriod[0].enrollment[0].end_date.slice(0, 4)}
					</p>
				</div>
			)}
			{notesByPeriod === null ? (
				<p>No hay materias para mostrar</p>
			) : (
				notesByPeriod.map(enrollment =>
					enrollment.enrollment.map(subject => (
						<div
							className={SeminarianCSS.subject}
							key={subject.subject_id}
						>
							<p className={SeminarianCSS.subjectName}>
								{subject.subject_name}
							</p>
							<div className={SeminarianCSS.scoreSubject}>
								<p>
									{subject.subject_total_score_out_of_graded_score
										? parseFloat(
												subject.subject_total_score_out_of_graded_scored_20_scale
										).toFixed(2)
										: 0}
								</p>
								<button
									onClick={e => {
										e.preventDefault();
										setScoreDetailsBySubject(
											subject.subject_id
										);
										setShowModal(true);
									}}
								>
									<img src={showScores} alt="ver notas" />
								</button>
							</div>
						</div>
					))
				)
			)}
		</div>
	);
};

export default SubjectsSeminarian;

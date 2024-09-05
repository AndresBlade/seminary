import React from 'react';
import SeminarianCSS from '../styles/seminarianCSS.module.css';
import { GetAcademicTermSeminarianInterfaces } from '../interfaces/seminarian';

interface AcademicTermSeminarianProps {
	dataAcademicterm: GetAcademicTermSeminarianInterfaces | null;
	setPeriod: React.Dispatch<React.SetStateAction<number>>;
}

const AcademicTermSeminarian = ({
	dataAcademicterm,
	setPeriod,
}: AcademicTermSeminarianProps) => {
	return (
		<div className={SeminarianCSS.academicTermSeminarian}>
			{dataAcademicterm?.enrollment.map(enrollment =>
				enrollment.academic_term.map(period => (
					<button
						key={period.academic_term_id}
						className={SeminarianCSS.buttonPeriod}
						onClick={e => {
							e.preventDefault();
							setPeriod(period.academic_term_id);
						}}
					>
						{period.academic_term_start_date.substring(0, 4)}
					</button>
				))
			)}
		</div>
	);
};

export default AcademicTermSeminarian;

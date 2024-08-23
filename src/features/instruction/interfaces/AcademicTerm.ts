export interface AcademicTerm {
	id: number;
	start_date: string;
	end_date: string;
	status: 'ACTIVO' | 'CULMINADO' | 'EQUIVALENCIAS';
	semester: 1 | 2;
	start_strin: string;
	end_string: string;
	name: string;
}

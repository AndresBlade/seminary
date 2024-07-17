import { AcademicField } from './AcademicField';

export interface SubjectFromDB {
	id: number;
	course_id: number;
	description: string;
	status: boolean;
	semester: 1 | 2;
	academic_field_id: AcademicField;
	homologada: boolean;
	precedent: SubjectFromDB | null;
}

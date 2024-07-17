export interface Subject {
	course_id: number;
	description: string;
	precedent: number | null;
	semester: 1 | 2;
	academic_field_id: number;
	homologado: 0 | 1;
}

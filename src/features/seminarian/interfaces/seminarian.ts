export interface GetAcademicTermSeminarianInterfaces{
    enrollment:{
        seminarian_id: string,
        academic_term: 
            {
                academic_term_id: number,
                academic_term_semester: number,
                academic_term_start_date: string,
                academic_term_end_date: string,
                academic_term_status: string
            }[]
    }[]
}
export interface NotesBySubjectSeminarianInterfaces{
        seminarian_id: string,
        seminarian_surname: string,
        seminarian_forename: string,
        enrollment: 
            {
                subject_id: number,
                subject_name: string,
                subject_status: string,
                enrollment_id: number,
                academic_term_id: number,
                start_date: string,
                end_date: string,
                academic_term_status: string,
                test_score: 
                    {
                        test_description: string,
                        test_score_out_of_20: string,
                        test_score_out_max_test_score: string,
                        test_score_was_edited: string
                    }[],
                subject_total_score_out_of_graded_score: string,
                subject_total_score_out_of_graded_scored_10_scale: string
            }[],
        grade_point_average: string
    
}

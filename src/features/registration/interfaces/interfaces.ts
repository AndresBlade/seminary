export interface SeminarianByStage{
    id:string
    name:string
    surname:string
    stage:number
}
export interface RegisteredSeminarian{
    id:string
    name:string
    surname:string
    stage:number

}
export interface SubjectsSeminarian{
    seminarian_id:string
    stage:string
    course:{
        course:string
        subject:{
            id:number
            name:string
            semester:string
        }[]
    }[]
}
export interface SubjectsRegistered{
    seminarian_id:string
    enrollment_id:number
    subject:
    {   id:number
        name:string
    },
    academic_term:
    {   id:number
        start_date:string
        end_date:string
        status:string
    },
    subject_status:string
}
export interface SubjectsProps{
    id:number
}
export interface AcademicTerm{
    id:number
    start_date:string
    end_date:string
    status:string
    semester:number
    start_strin:string
    end_string:string
    name:string
}
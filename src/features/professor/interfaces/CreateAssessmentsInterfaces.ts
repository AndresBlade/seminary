export interface Evaluation{
    description:string
    maximum_score:number
    
}
export interface Subjects{
    id:number
    course_id:number
    description:string
    status:boolean
    precedent:number | null
    semester:number
    academic_field_id: {
            id: number,
            stage: {
                id: number,
                description: string
            },
            description: string
        },
        instruction: 
            {
                professor_id: string | null,
                subject_id: number,
                academic_term_id: number
            }[]
}
export interface TestsSubject
{
    id: number,
    subject_id: number,
    academic_term_id: number,
    description: string,
    status: boolean,
    maximum_score: number
}
interface Test {
    id: number;
    description: string;
    maximum_score: number;
}

interface TestScore {
    test_id: number;
    score: string;
}

interface Seminarian {
    enrollment_id: number;
    seminarian_id: string;
    seminarian_surname: string;
    seminarian_forename: string;
    test_score: TestScore[];
}[]

export interface Data {
    tests: Test[];
    seminarians: Seminarian[];
}

export interface TestScoreToSendInterfaces{
    tests_score:{
        enrollment_id:number
        test:{
            test_id:number
            score:number
        }[]
    }[]
}
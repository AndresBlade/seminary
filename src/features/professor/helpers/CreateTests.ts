import { Evaluation } from "../interfaces/CreateAssessmentsInterfaces";

export async function CreateTests({subject_id,academic_term_id,tests,token}:{subject_id:number,academic_term_id:number,tests:Evaluation[],token:string}):Promise<Response> {
    const response = await fetch('http://127.0.0.1:3000/test',{
        method:'POST',
        mode:"cors",
        credentials:"same-origin",
        headers:{
            'Content-Type': 'application/json',
            auth:token
        },
        body:JSON.stringify({
            subject_id:subject_id,
            academic_term_id:academic_term_id,
            tests:tests
        })
    })
    return response
}
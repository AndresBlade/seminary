
export async function CreateRegistration({idSeminarian,subjects, AcademicTerm, token}:{idSeminarian:string,subjects:number[],AcademicTerm:number[],token:string}):Promise<Response> {
    const response = await fetch('http://127.0.0.1:3000/enrollment/',{
        method:'POST',
        mode:'cors',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json',
            auth:token
        },
        body:JSON.stringify(
            {
                seminarian_id:idSeminarian,
                subject_id:subjects,
                academic_term_id:AcademicTerm[0]
            }
        )
    })
    return response
}
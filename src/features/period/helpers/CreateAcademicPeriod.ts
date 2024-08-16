import { CreatePeriod } from "../interfaces/Period";

export async function CreateAcademicPeriod({data,token}:{data:CreatePeriod, token:string}):Promise<Response> {
    const response = await fetch('http://127.0.0.1:3000/AcademicTerm/',{
        method:"POST",
        mode:"cors",
        credentials:"same-origin",
        headers:{
            'Content-Type': 'application/json',
            auth:token
        },
        body:JSON.stringify({
            start_date:data.start_date,
            end_date:data.end_date
        })
    
    })

    console.log(response)

    return response
}

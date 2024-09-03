import { TestScoreToSendInterfaces } from "../interfaces/CreateAssessmentsInterfaces";

export async function CreateTestScore({data,token}:{data:TestScoreToSendInterfaces, token:string}) {
    return await fetch('http://127.0.0.1:3000/testScore/',{
        method:'PUT',
        mode: 'cors',
        credentials:'same-origin',
        headers:{
            'Content-type':'application/json',
            auth:token
        },
        body:JSON.stringify(
            data
        )
    })
}
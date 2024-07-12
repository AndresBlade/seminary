import { blood } from "../interfaces/Form"

export const GetBlood = (token:string)=>{
    return fetch('http://127.0.0.1:3000/extras/blood/',{
        headers:{
            auth:token,
        },
    }).then((response)=>{
        return response.json() as Promise<blood>
    })
}

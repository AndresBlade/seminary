import { GetAcademicTermSeminarianInterfaces } from "../interfaces/seminarian"
export const GetAcademicTermSeminarian = ({id,token}:{id:string,token:string}):Promise<GetAcademicTermSeminarianInterfaces>=>{
    return fetch(`${import.meta.env.VITE_URL}/enrollment/seminarian-academic-term/?seminarian_id=${id}`,{
        headers:{
            auth:token
        }
    }).then(response=>
        response.json() as Promise<GetAcademicTermSeminarianInterfaces>
    )
}
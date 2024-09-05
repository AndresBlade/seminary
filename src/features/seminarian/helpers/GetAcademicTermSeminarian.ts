import { GetAcademicTermSeminarianInterfaces } from "../interfaces/seminarian"
export const GetAcademicTermSeminarian = (id:string):Promise<GetAcademicTermSeminarianInterfaces>=>{
    return fetch(`${import.meta.env.VITE_URL}/enrollment/seminarian-academic-term/?seminarin_id=${id}`).then(response=>
        response.json() as Promise<GetAcademicTermSeminarianInterfaces>
    )
}
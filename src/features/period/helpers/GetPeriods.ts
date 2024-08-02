import { GetPeriod } from "../interfaces/Period"

export const GetPeriods = ({id}:{id:string}):Promise<GetPeriod[]>=>{
    return fetch(id ? `http://127.0.0.1:3000/AcademicTerm/${id}` : 'http://3000/AcademicTerm/').then(
        response=>response.json() as Promise<GetPeriod[]>
    )
}
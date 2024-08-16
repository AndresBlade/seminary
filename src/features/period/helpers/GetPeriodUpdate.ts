import { GetPeriod } from "../interfaces/Period"

export const GetPeriodUpdate = ({id}:{id:number}):Promise<GetPeriod>=>{
    return fetch(`http://127.0.0.1:3000/AcademicTerm/${id}`).then(
        response=>response.json() as Promise<GetPeriod>

    )
    
}
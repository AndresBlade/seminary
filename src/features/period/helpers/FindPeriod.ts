import { GetPeriod } from "../interfaces/Period"

export const FindPeriod = ({date}:{date:string}):Promise<GetPeriod[]>=>{
    return fetch(`http://127.0.0.1:3000/AcademicTerm/?fecha=${date}`).then(
        response=>response.json() as Promise<GetPeriod[]>

    )
    
}
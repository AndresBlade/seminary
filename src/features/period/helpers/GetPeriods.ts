import { GetPeriod } from "../interfaces/Period"

export const GetPeriods = ():Promise<GetPeriod[]>=>{
    return fetch('http://127.0.0.1:3000/AcademicTerm/').then(
        response=>response.json() as Promise<GetPeriod[]>

    )
    
}
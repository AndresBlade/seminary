import { AcademicTerm } from "../interfaces/interfaces"
export const GetAcademicTerm = ():Promise<AcademicTerm[]>=>{
    return fetch(`http://127.0.0.1:3000/AcademicTerm`).then(
        response=>response.json() as Promise<AcademicTerm[]>
    )
}
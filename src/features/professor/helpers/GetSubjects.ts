import { Subjects } from "../interfaces/CreateAssessmentsInterfaces"

export const GetSubjects = ():Promise<Subjects[]>=>{
    return fetch(`http://127.0.0.1:3000/subject/inst`).then(
        response=>response.json() as Promise<Subjects[]>

    )
}
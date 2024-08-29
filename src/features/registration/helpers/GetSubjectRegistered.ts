import { SubjectsRegistered } from "../interfaces/interfaces"

export const GetSubjectRegistered = (id:string):Promise<SubjectsRegistered[]>=>{
    return fetch(`http://127.0.0.1:3000/enrollment/?seminarian_id=${id}`).then(
        response=> response.json() as Promise<SubjectsRegistered[]>
    )
}
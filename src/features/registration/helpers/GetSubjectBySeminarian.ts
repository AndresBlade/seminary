import { SubjectsSeminarian } from "../interfaces/interfaces"
export const GetSubjectBySeminarian = ({id}:{id:string,token:string}):Promise<SubjectsSeminarian>=>{
    return fetch(`http://127.0.0.1:3000/enrollment/academic-status/${id}`).then(
        response=>response.json() as Promise<SubjectsSeminarian>
    )
}
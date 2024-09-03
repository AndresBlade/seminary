import { TestsSubject } from "../interfaces/CreateAssessmentsInterfaces"

export const GetTestsSubject = ({id}:{id:number}):Promise<TestsSubject[]>=>{
    return fetch(`http://127.0.0.1:3000/test/?subject_id=${id}`).then(
        response=>response.json() as Promise<TestsSubject[]>

    )
}
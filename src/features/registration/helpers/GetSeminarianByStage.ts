import { SeminarianByStage } from "../interfaces/interfaces"
export const GetSeminarianByStage = ({stage}:{stage:string,token:string}):Promise<SeminarianByStage[]>=>{
    return fetch(`http://127.0.0.1:3000/enrollment/seminarian-stage/?stage=${stage}`).then(
        response=>response.json() as Promise<SeminarianByStage[]>
    )
}
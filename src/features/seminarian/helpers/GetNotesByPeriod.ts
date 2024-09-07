import { NotesBySubjectSeminarianInterfaces } from "../interfaces/seminarian"

export const GetNotesByPeriod = ({id,period,token}:{id:string,period:number,token:string}):Promise<NotesBySubjectSeminarianInterfaces[]>=>{
    return fetch(`${import.meta.env.VITE_URL}/test/by-subject/?academic_term_id=${period}&seminarian_id=${id}`,{
        headers:{
            auth:token
        }
    }).then(response=> response.json() as Promise<NotesBySubjectSeminarianInterfaces[]>)
}
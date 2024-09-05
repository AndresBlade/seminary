import { NotesBySubjectSeminarianInterfaces } from "../interfaces/seminarian"

export const GetNotesByPeriod = ({id,period}:{id:string,period:number}):Promise<NotesBySubjectSeminarianInterfaces[]>=>{
    return fetch(`${import.meta.env.VITE_URL}/test/by-subject/?academic_term_id=${period}&seminarian_id=${id}`).then(response=> response.json() as Promise<NotesBySubjectSeminarianInterfaces[]>)
}
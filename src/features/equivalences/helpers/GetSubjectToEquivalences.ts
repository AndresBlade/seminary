import { subjects } from "../interfaces/equivalences";

export const GetSubjectToEquivalences = (id:string): Promise<subjects>=>{
    return fetch(`${import.meta.env.VITE_URL}/enrollment/equivalency-list/${id}`).then(response=> response.json() as Promise<subjects>)
}
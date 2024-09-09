import { subjects } from "../interfaces/equivalences";

export const GetSubjectToEquivalences = ({id,token}:{id:string,token:string}): Promise<subjects>=>{
    return fetch(`${import.meta.env.VITE_URL}/enrollment/equivalency-list/${id}`,{
        headers:{
            auth:token
        }
    }).then(response=> response.json() as Promise<subjects>)
}
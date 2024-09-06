import { seminarian } from "../interfaces/equivalences";

export const GetSeminariansToEquivalences = (token:string): Promise<seminarian[]>=>{
    return fetch(`${import.meta.env.VITE_URL}/seminarian/getsem`,{
        headers:{
            auth:token
        }
    }).then(response => response.json() as Promise<seminarian[]>
    );
}
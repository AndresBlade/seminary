import { getParishByDioceseProps } from "../interfaces/Form"

export const GetParishByDiocese = ({dioceseId,token}:{dioceseId:string, token:string})=>{
    return fetch(`http://127.0.0.1:3000/parish/search-by-diocese/${dioceseId}`,{
        headers:{
            auth:token,
        },
    }).then((response)=>{
        if(!response.ok){
            throw new Error("error al listar las parroquias de la diocesis correspondiente");
            
        }
        return response.json() as Promise<getParishByDioceseProps[]>
    })
}

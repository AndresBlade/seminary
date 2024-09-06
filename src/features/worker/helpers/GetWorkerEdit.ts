import { dataGetWorker } from "../interfaces/worker";

export const GetWorkerEdit = ({id,token}:{id:string,token:string}):Promise<dataGetWorker[]>=>{
    return fetch(`${import.meta.env.VITE_URL}/worker/?id=${id}`,{
        headers:{
            auth:token
        }
    }).then(response=> response.json() as Promise<dataGetWorker[]>)
}
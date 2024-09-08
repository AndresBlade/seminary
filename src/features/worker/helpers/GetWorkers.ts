import { dataGetWorker } from "../interfaces/worker";

export const GetWorker = (token:string):Promise<dataGetWorker[]>=>{
    return fetch(`${import.meta.env.VITE_URL}/worker`,{
        headers:{
            auth:token
        }
    }).then(response=> response.json() as Promise<dataGetWorker[]>)
}
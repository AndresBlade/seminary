import { schedulesInterfaces } from "../interfaces/schedules"
export const GetSchedules = (token:string):Promise<schedulesInterfaces[]>=>{
    return fetch(`${import.meta.env.VITE_URL}/horario`,{
        headers:{
            auth:token
        }
    }).then(response=>response.json() as Promise<schedulesInterfaces[]>)
}
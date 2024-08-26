import { RegisteredSeminarian } from "../interfaces/interfaces";
export const GetAllRegistration = ():Promise<RegisteredSeminarian[]>=>{
    return fetch(`http://127.0.0.1:3000/enrollment/seminarian-stage`).then(
        response=>response.json() as Promise<RegisteredSeminarian[]>
    )
}
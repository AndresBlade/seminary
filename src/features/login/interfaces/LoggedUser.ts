import { Permission } from "../../roles/interfaces/Permission"

export interface LoggedUser{
    person_id:string
    permision_id:string,
    Permisos: Permission[],
    password:string,
    status: boolean,
    fecha:string
    token:string
}

import { Permission } from "../../roles/interfaces/Permission"

export interface LoggedUser{
    permision_id:string,
    Permisos: Permission[],
    password:string,
    status: boolean,
    fecha:string
}

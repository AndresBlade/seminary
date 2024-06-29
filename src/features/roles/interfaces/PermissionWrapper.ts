import { Permission } from "./Permission";

export interface PermissionWrapper{
    permissions: Permission[],
    token:string | null
}
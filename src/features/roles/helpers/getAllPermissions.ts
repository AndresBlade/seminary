import { Permission } from '../interfaces/Permission';
import { PermissionWrapper } from '../interfaces/PermissionWrapper';
export const getAllPermissions =async (token:string):Promise<PermissionWrapper>  =>{

	const response = await fetch('http://127.0.0.1:3000/role/permi',{
		headers:{
			auth:token
		}
	})
	const permissions = await response.json() as Permission[];
	const newToken = response.headers.get('auth')
	return {permissions,token: newToken}
}
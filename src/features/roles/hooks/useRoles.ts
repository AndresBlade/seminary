import { useContext, useEffect, useState } from 'react';
import { getRoles } from '../helpers/getRoles';
import { AuthContext } from '../../login/context/AuthContext';
import { RolesWrapper } from '../interfaces/RolesWrapper';

export const useRoles = () => {
	const [roles, setRoles] = useState<RolesWrapper | null>(null);
	const {user} = useContext(AuthContext)

	useEffect(() => {
		if(!user){
			return
		}
		if(!roles){
			return
		}
		getRoles(user.token).then((rolesWrappers)=>{
			setRoles(rolesWrappers)
		}).catch((error)=>console.log(error))	
		
	}, [roles,user]);

	return roles;
};

import { useEffect, useState } from 'react';
import { getRoles } from '../helpers/getRoles';
import { RolesWrapper } from '../interfaces/RolesWrapper';

export const useRoles = (token: string | null) => {
	const [roles, setRoles] = useState<RolesWrapper | null>(null);
	useEffect(() => {
		if (!token) return;
		getRoles(token)
			.then(rolesWrapper => {
				setRoles(rolesWrapper);
			})
			.catch(error => console.log(error));
	}, [token]);

	return roles;
};

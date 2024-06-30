import { useContext, useEffect, useState } from 'react';
import { getRoles } from '../helpers/getRoles';
import { AuthContext } from '../../login/context/AuthContext';
import { Role } from '../interfaces/Role';

export const useRoles = () => {
	const [roles, setRoles] = useState<Role[] | null>(null);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;

		getRoles(user.token)
			.then(roles => {
				setRoles(roles);
			})
			.catch(error => console.log(error));
	}, [user]);

	return roles;
};

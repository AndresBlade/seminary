import { useContext, useEffect, useState } from 'react';
import { getRoles } from '../helpers/getRoles';
import { RolesWrapper } from '../interfaces/RolesWrapper';
import { AuthContext } from '../../login/context/AuthContext';

export const useRoles = (token: string | null, thereWillBeToken: boolean) => {
	const [roles, setRoles] = useState<RolesWrapper | null>(null);
	const { setUser, user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		if (!token && thereWillBeToken) return;
		const tokenForFetch = token ?? user?.token;
		if (!tokenForFetch) return;
		if (roles) return;

		getRoles(tokenForFetch)
			.then(rolesWrapper => {
				setRoles(rolesWrapper);
				setUser(user => {
					if (!user) return null;
					return { ...user, token: rolesWrapper.token };
				});
			})
			.catch(error => console.log(error));
	}, [token, roles, setUser, user, thereWillBeToken]);

	return roles;
};

import { useContext, useEffect, useState } from 'react';
import { getAllPermissions } from '../helpers/getAllPermissions';
import { PermissionWrapper } from '../interfaces/PermissionWrapper';
import { AuthContext } from '../../login/context/AuthContext';

export const usePermissions = (
	token: string | null,
	thereWillBeToken: boolean
) => {
	const [permissionsWrapper, setPermissionsWrapper] =
		useState<null | PermissionWrapper>(null);
	const { setUser, user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;
		if (!token && thereWillBeToken) return;
		const tokenForFetch = token ?? user?.token;
		if (!tokenForFetch) return;
		if (permissionsWrapper) return;

		getAllPermissions(tokenForFetch)
			.then(permissions => {
				setPermissionsWrapper(permissions);
				setUser(user => {
					if (!user) return null;
					return { ...user, token: permissions.token };
				});
			})
			.catch(error => console.log(error));
	}, [token, permissionsWrapper, setUser, user, thereWillBeToken]);
	return permissionsWrapper;
};

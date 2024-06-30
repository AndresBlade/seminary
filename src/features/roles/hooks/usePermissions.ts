import { useEffect, useState } from 'react';
import { getAllPermissions } from '../helpers/getAllPermissions';
import { PermissionWrapper } from '../interfaces/PermissionWrapper';
export const usePermissions = (token: string | null) => {
	const [permissionsWrapper, setPermissionsWrapper] =
		useState<null | PermissionWrapper>(null);
	useEffect(() => {
		if (!token) return;
		getAllPermissions(token)
			.then(permissions => {
				setPermissionsWrapper(permissions);
			})
			.catch(error => console.log(error));
	}, [token]);
	return { permissionsWrapper, setPermissionsWrapper };
};

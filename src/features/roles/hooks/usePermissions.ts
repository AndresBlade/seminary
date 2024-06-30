import { useContext, useEffect, useState } from 'react';
import { getAllPermissions } from '../helpers/getAllPermissions';
import { AuthContext } from '../../login/context/AuthContext';
import { Permission } from '../interfaces/Permission';

export const usePermissions = () => {
	const [permissions, setPermissions] = useState<null | Permission[]>(null);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) return;

		getAllPermissions(user.token)
			.then(roles => {
				setPermissions(roles);
			})
			.catch(error => console.log(error));
	}, [user]);
	return permissions;
};

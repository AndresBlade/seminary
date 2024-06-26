import { useEffect, useState } from 'react';
import { Permission } from '../interfaces/Permission';
import { getAllPermissions } from '../helpers/getAllPermissions';
import { useContext } from 'react';
import { AuthContext } from '../../login/context/AuthContext';
export const usePermissions = () => {
	const [permissions, setPermissions] = useState<null | Permission[]>(null);
	const {user} = useContext(AuthContext);

	useEffect(() => {
		getAllPermissions('hola')
			.then(data => setPermissions(data))
			.catch(err => console.log(err));
	}, []);

	return permissions;
};

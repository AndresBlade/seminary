import { useEffect, useState } from 'react';
import { Permission } from '../interfaces/Permission';
import { getAllPermissions } from '../helpers/getAllPermissions';

export const usePermissions = () => {
	const [permissions, setPermissions] = useState<null | Permission[]>(null);

	useEffect(() => {
		getAllPermissions()
			.then(data => setPermissions(data))
			.catch(err => console.log(err));
	}, []);

	return permissions;
};

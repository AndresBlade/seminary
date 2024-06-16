import { useEffect, useState } from 'react';
import { Role } from '../interfaces/Role';
import { getRoles } from '../helpers/getRoles';

export const useRoles = () => {
	const [roles, setRoles] = useState<Role[] | null>(null);

	useEffect(() => {
		getRoles()
			.then(data => setRoles(data))
			.catch(err => console.log(err));
	}, []);

	return roles;
};

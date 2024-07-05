/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';
import RolesCSS from '../features/roles/styles/roles.module.css';
import useApiGet from '../features/roles/hooks/useApiGet';
import { SearchRoleInput } from '../features/roles/components/SearchRoleInput';
import { Role } from '../features/roles/interfaces/Role';
import { RoleTable } from '../features/roles/components/RoleTable';
import { useForm } from '../shared/hooks/useForm';

const apiUrl = 'http://localhost:3000/role/search';

export const Roles = () => {
	const { name, onInputChange } = useForm({ name: '' });
	const [roleNameToSearch, setRoleNameToSearch] = useState('');
	const {
		data: roles,
		loading,
		error,
		setData: setRoles,
	} = useApiGet<Role[] | null>(apiUrl);

	useEffect(() => {
		if (!name) setRoleNameToSearch(name);
	}, [name]);
	return (
		<div className={RolesCSS['roles-table__container']}>
			<div className={RolesCSS['roles-table__h2']}>
				<h2>Lista Roles</h2>
			</div>
			<div className={RolesCSS['roles-table']}>
				<SearchRoleInput
					setValue={onInputChange}
					value={name}
					setRoleNameToSearch={setRoleNameToSearch}
				/>
				{roles && (
					<RoleTable
						roles={
							roleNameToSearch
								? roles.filter(
										role =>
											role.name
												.toLowerCase()
												.includes(
													roleNameToSearch.toLowerCase()
												) ||
											role.description
												.toLowerCase()
												.includes(
													roleNameToSearch.toLowerCase()
												)
								  )
								: roles
						}
						error={error}
						loading={loading}
						setRoles={setRoles}
					/>
				)}
			</div>
		</div>
	);
};

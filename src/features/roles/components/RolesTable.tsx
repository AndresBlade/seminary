/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import RolesCSS from '../styles/roles.module.css';
import useApiGet from '../hooks/useApiGet';
import useApiDelete from '../hooks/useApiDelete';
import { SearchRoleInput } from './SearchRoleInput';
import { Role } from '../interfaces/Role';
import { RoleTable } from './RoleTable';
import { useForm } from '../hooks/useForm';

const apiUrl = 'http://localhost:3000/role/';

export const RolesTable = () => {
	const { name, onInputChange } = useForm({ name: '' });
	const [roleNameToSearch, setRoleNameToSearch] = useState('');
	const [roleToDelete, setRoleToDelete] = React.useState<number>(0);
	const { data: roles, loading, error } = useApiGet<Role[] | null>(apiUrl);
	const { deleteData } = useApiDelete(apiUrl, roleToDelete);

	useEffect(() => {
		if (roleToDelete) {
			deleteData().catch(console.error);
			window.location.reload();
		}

		if (!name) setRoleNameToSearch(name);
	}, [roleToDelete, deleteData, name]);
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
						setRoleToDelete={setRoleToDelete}
					/>
				)}
			</div>
		</div>
	);
};

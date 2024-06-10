import React, { useEffect, useState } from 'react';
import RolesCSS from '../styles/roles.module.css';
import { useRolePost } from '../hooks/useRolePost';
import { usePermissions } from '../hooks/usePermissions';
import { Row } from './Row';
import { Permission } from '../interfaces/Permission';

interface SubmitFormProps {
	e: React.FormEvent<HTMLFormElement>;
	roleName: string;
	roleDescription: string;
	checkedPermissions: { id: number; checked: boolean }[];
}

const handleSubmit = ({
	e,
	roleName,
	roleDescription,
	checkedPermissions,
}: SubmitFormProps) => {
	e.preventDefault();
	if (
		roleName.length === 0 ||
		roleDescription.length === 0 ||
		checkedPermissions?.every(
			checkedPermission => !checkedPermission.checked
		)
	) {
		return alert('Todos los campos son obligatorios');
	} else {
		const name = roleName;
		const description = roleDescription;
		const numbers = checkedPermissions
			.filter(permission => permission.checked)
			.map(permission => permission.id);
		useRolePost({ name, description, numbers });
	}
};

export const RolesCreate = () => {
	const [roleName, setRoleName] = React.useState('');

	const [roleDescription, setRoleDescription] = React.useState('');

	const permissions = usePermissions();
	const [checkedPermissions, setCheckedPermissions] = useState<
		{ id: number; checked: boolean }[] | null
	>(null);

	useEffect(() => {
		setCheckedPermissions(
			permissions?.map(({ id }) => ({ id, checked: false })) ?? null
		);
	}, [permissions]);

	const permissionsByTable = permissions?.reduce(
		(group: Record<string, Permission[]>, permission: Permission) => {
			const { table } = permission;

			if (!group[table]) {
				group[table] = group[table] ?? [];
			}
			group[table].push(permission);
			return group;
		},
		{}
	);

	console.log(checkedPermissions);

	const tables = permissionsByTable && Object.keys(permissionsByTable);

	return (
		<div className={RolesCSS['roles-create__container']}>
			<div className={RolesCSS['roles-create__h2--title']}>
				<h2>Agregar rol de usuario</h2>
			</div>
			<form
				action="POST"
				className={RolesCSS.form}
				onSubmit={e => {
					if (checkedPermissions)
						handleSubmit({
							e,
							roleName,
							roleDescription,
							checkedPermissions,
						});
				}}
			>
				<div className={RolesCSS['roles-create__form']}>
					<h2 className={RolesCSS['roles-create__h2']}>Crear Rol</h2>
					<label htmlFor="name">Nombre * </label>
					<input
						type="text"
						name="name"
						id="name"
						className={RolesCSS['input-name']}
						value={roleName}
						onChange={e => setRoleName(e.target.value)}
						autoFocus
					/>
					<label htmlFor="description">Descripción</label>
					<textarea
						name="description"
						id="description"
						value={roleDescription}
						className={RolesCSS['input-name']}
						onChange={e => setRoleDescription(e.target.value)}
					></textarea>
					<div className={RolesCSS['table-permission__container']}>
						<table className={RolesCSS['table-permission']}>
							<thead
								className={RolesCSS['table-permission__thead']}
							>
								<tr>
									<th>Ruta</th>
									<tr
										className={
											RolesCSS[
												'table-permission__thead--options'
											]
										}
									>
										<th>Ver</th>
										<th>crear</th>
										<th>editar</th>
										<th>eliminar</th>
									</tr>
								</tr>
							</thead>
							<tbody
								className={RolesCSS['table-permission__tbody']}
							>
								{tables?.map(
									(table, index) =>
										permissionsByTable && (
											<Row
												checkedPermissions={
													checkedPermissions
												}
												setCheckedPermissions={
													setCheckedPermissions
												}
												key={index}
												tableName={table}
												permissions={
													permissionsByTable[table]
												}
											/>
										)
								)}
							</tbody>
						</table>
					</div>

					<button
						type="submit"
						id="send"
						className={RolesCSS['button-send']}
						disabled={checkedPermissions?.every(
							permission => !permission.checked
						)}
					>
						Crear
					</button>
				</div>
			</form>
		</div>
	);
};

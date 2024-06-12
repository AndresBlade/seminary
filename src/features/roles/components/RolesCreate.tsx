import React, { useEffect, useState } from 'react';
import RolesCSS from '../styles/roles.module.css';
import { createRole } from '../helpers/createRole';
import { usePermissions } from '../hooks/usePermissions';
import { Permission } from '../interfaces/Permission';
import { useForm } from '../hooks/useForm';
import { CheckedPermission } from '../interfaces/CheckedPermission';
import { PermissionsTable } from './PermissionsTable';

interface SubmitFormProps {
	e: React.FormEvent<HTMLFormElement>;
	roleName: string;
	roleDescription: string;
	checkedPermissions: CheckedPermission[];
}

const handleSubmit = ({
	e,
	roleName,
	roleDescription,
	checkedPermissions,
}: SubmitFormProps) => {
	e.preventDefault();
	if (
		!roleName.length ||
		!roleDescription.length ||
		checkedPermissions.every(
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
		createRole({ name, description, numbers })
			.then(data => console.log(data))
			.catch(err => console.log(err));
	}
};

export const RolesCreate = () => {
	const { roleName, roleDescription, onInputChange } = useForm({
		roleName: '',
		roleDescription: '',
	});

	const permissions = usePermissions();
	const [checkedPermissions, setCheckedPermissions] = useState<
		CheckedPermission[] | null
	>(null);

	const permissionsByRoute = permissions?.reduce(
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

	const tables = permissionsByRoute && Object.keys(permissionsByRoute);

	useEffect(() => {
		setCheckedPermissions(
			permissions?.map(({ id }) => ({ id, checked: false })) ?? null
		);
	}, [permissions]);

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
						name="roleName"
						placeholder="Ej: Supervisor estudiantil"
						id="name"
						className={RolesCSS['input-name']}
						value={roleName}
						onChange={onInputChange}
						autoFocus
					/>
					<label htmlFor="description">Descripción</label>
					<input
						type="text"
						name="roleDescription"
						id="description"
						placeholder="Ej: Supervisa las notas de nuevo ingreso"
						value={roleDescription}
						className={RolesCSS['input-name']}
						onChange={onInputChange}
					></input>

					{tables && checkedPermissions && (
						<PermissionsTable
							tables={tables}
							permissionsByRoute={permissionsByRoute}
							checkedPermissions={checkedPermissions}
							setCheckedPermissions={setCheckedPermissions}
						/>
					)}

					<div className={RolesCSS.buttons}>
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
				</div>
			</form>
		</div>
	);
};

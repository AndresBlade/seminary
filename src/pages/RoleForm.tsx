import React, { useEffect, useState } from 'react';
import RolesCSS from '../features/roles/styles/roles.module.css';
import { createRole } from '../features/roles/helpers/createRole';
import { usePermissions } from '../features/roles/hooks/usePermissions';
import { Permission } from '../features/roles/interfaces/Permission';
import { useForm } from '../features/roles/hooks/useForm';
import { CheckedPermission } from '../features/roles/interfaces/CheckedPermission';
import { PermissionsTable } from '../features/roles/components/PermissionsTable';
import { useRoles } from '../features/roles/hooks/useRoles';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { editRole } from '../features/roles/helpers/editRole';

interface SubmitFormProps {
	e: React.FormEvent<HTMLFormElement>;
	roleName: string;
	roleDescription: string;
	checkedPermissions: CheckedPermission[];
	id?: number;
	navigate: NavigateFunction;
}

const handleSubmit = async ({
	e,
	roleName,
	roleDescription,
	checkedPermissions,
	id,
	navigate,
}: SubmitFormProps) => {
	e.preventDefault();

	console.log({ roleName, roleDescription, checkedPermissions });

	const name = roleName;
	const description = roleDescription;
	const numbers = checkedPermissions
		.filter(permission => permission.checked)
		.map(permission => permission.id);

	if (id) {
		await editRole({ id, name, description, numbers });
		navigate('../');
		return;
	}
	await createRole({ name, description, numbers });

	navigate('../');
};

export const RoleForm = () => {
	const { roleName, roleDescription, onInputChange, setFormState } = useForm({
		roleName: '',
		roleDescription: '',
	});

	const navigate = useNavigate();

	const [formHasBeenSetToDefault, setFormHasBeenSetToDefault] =
		useState(false);

	const { id } = useParams();

	const roles = useRoles();

	const initialRole = roles?.find(role => role.id === Number(id));

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
		if (!checkedPermissions) {
			setCheckedPermissions(
				permissions?.map(({ id }) => ({ id, checked: false })) ?? null
			);
			return;
		}

		if (formHasBeenSetToDefault) return;

		if (!initialRole) return;

		setFormState({
			roleName: initialRole.name,
			roleDescription: initialRole.description,
		});
		setCheckedPermissions(previousCheckedPermissions => {
			if (!previousCheckedPermissions) return null;
			const newCheckedPermissions = previousCheckedPermissions.map(
				previousPermission => {
					if (
						initialRole.premissions.find(
							rolePermission =>
								rolePermission.id === previousPermission.id
						)
					)
						return { ...previousPermission, checked: true };
					return previousPermission;
				}
			);

			return newCheckedPermissions;
		});
		setFormHasBeenSetToDefault(true);
	}, [
		checkedPermissions,
		id,
		permissions,
		roles,
		setFormState,
		initialRole,
		formHasBeenSetToDefault,
	]);

	return (
		<div className={RolesCSS['roles-create__container']}>
			<div className={RolesCSS['roles-create__h2--title']}>
				<h2>{initialRole ? 'Editar' : 'Agregar'} rol de usuario</h2>
			</div>
			<form
				className={RolesCSS.form}
				onSubmit={e => {
					if (checkedPermissions)
						handleSubmit({
							e,
							roleName,
							roleDescription,
							checkedPermissions,
							id: Number(id),
							navigate,
						}).catch(err => console.log(err));
				}}
			>
				<div className={RolesCSS['roles-create__form']}>
					<h2 className={RolesCSS['roles-create__h2']}>
						{initialRole ? 'Editar' : 'Agregar'} Rol
					</h2>
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
							disabled={
								(checkedPermissions?.every(
									permission => !permission.checked
								) ??
									!roleDescription) ||
								!roleName
							}
						>
							Enviar
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

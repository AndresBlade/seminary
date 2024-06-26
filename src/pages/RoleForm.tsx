import React, { useContext, useEffect, useState } from 'react';
import RolesCSS from '../features/roles/styles/roles.module.css';
import { createRole } from '../features/roles/helpers/createRole';
import { Permission } from '../features/roles/interfaces/Permission';
import { useForm } from '../features/roles/hooks/useForm';
import { CheckedPermission } from '../features/roles/interfaces/CheckedPermission';
import { PermissionsTable } from '../features/roles/components/PermissionsTable';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { editRole } from '../features/roles/helpers/editRole';
import { AuthContext } from '../features/login/context/AuthContext';
import { usePermissions } from '../features/roles/hooks/usePermissions';
import { useRoles } from '../features/roles/hooks/useRoles';

interface SubmitFormProps {
	e: React.FormEvent<HTMLFormElement>;
	roleName: string;
	roleDescription: string;
	checkedPermissions: CheckedPermission[];
	id?: number;
	navigate: NavigateFunction;
	token: string;
}

const handleSubmit = async ({
	e,
	roleName,
	roleDescription,
	checkedPermissions,
	id,
	navigate,
	token,
}: SubmitFormProps) => {
	e.preventDefault();

	const name = roleName;
	const description = roleDescription;
	const numbers = checkedPermissions
		.filter(permission => permission.checked)
		.map(permission => permission.id);

	console.log(token);

	if (id) {
		await editRole({ id, name, description, numbers, token });
		navigate('../');
		return;
	}
	await createRole({ name, description, numbers, token });

	navigate('../');
};

export const RoleForm = () => {
	const { roleName, roleDescription, onInputChange, setFormState } = useForm({
		roleName: '',
		roleDescription: '',
	});

	const { user, setUser } = useContext(AuthContext);
	const { id } = useParams();
	const navigate = useNavigate();

	const roles = useRoles();
	const permissions = usePermissions();

	const initialRole = roles?.find(role => role.id === Number(id));

	const [formHasBeenSetToDefault, setFormHasBeenSetToDefault] =
		useState(false);
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
				permissions?.map(({ id }) => ({
					id,
					checked: false,
				})) ?? null
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
		formHasBeenSetToDefault,
		initialRole,
		permissions,
		setFormState,
		roles,
		setUser,
		user,
	]);

	return (
		<div className={RolesCSS['roles-create__container']}>
			<div className={RolesCSS['roles-create__h2--title']}>
				<h2>{initialRole ? 'Editar' : 'Agregar'} rol de usuario</h2>
			</div>
			<form
				className={RolesCSS.form}
				onSubmit={e => {
					if (!checkedPermissions) return;
					if (!user?.token) return;
					handleSubmit({
						e,
						roleName,
						roleDescription,
						checkedPermissions,
						id: Number(id),
						navigate,
						token: user.token,
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

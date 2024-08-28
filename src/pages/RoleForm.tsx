import React, { useContext, useEffect, useState } from 'react';
import RolesCSS from '../features/roles/styles/roles.module.css';
import { createRole } from '../features/roles/helpers/createRole';
import { Permission } from '../features/roles/interfaces/Permission';
import { useForm } from '../shared/hooks/useForm';
import { CheckedPermission } from '../features/roles/interfaces/CheckedPermission';
import { PermissionsTable } from '../features/roles/components/PermissionsTable';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { editRole } from '../features/roles/helpers/editRole';
import { AuthContext } from '../features/login/context/AuthContext';
import { usePermissions } from '../features/roles/hooks/usePermissions';
import { useRoles } from '../features/roles/hooks/useRoles';
import { ContentContainer } from '../features/ui/container/components/ContentContainer';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { InputFormField } from '../features/subject/components/InputFormField';
import { FormFields } from '../features/subject/components/FormFields';
import { FormField } from '../features/subject/components/FormField';
import { Label } from '../features/subject/components/Label';

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
		<>
			<TitleList>
				<Title content="Usuarios" />
				<BackgroundColoredSubtitle
					content={`${
						initialRole ? 'Editar' : 'Agregar'
					} rol de usuario`}
				/>
			</TitleList>
			<ContentContainer>
				<form
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
					<FormFields>
						<InputFormField
							type="text"
							labelText="Nombre *"
							name="roleName"
							placeholder="Ej: Supervisor estudiantil"
							id="name"
							value={roleName}
							onInputChange={onInputChange}
							autoFocus
						/>
						<InputFormField
							labelText="Descripción *"
							type="text"
							name="roleDescription"
							id="description"
							placeholder="Ej: Supervisa las notas de nuevo ingreso"
							value={roleDescription}
							onInputChange={onInputChange}
						/>

						{tables && checkedPermissions && permissions && (
							<FormField>
								<Label labelText="Permisos *" />
								<PermissionsTable
									tables={tables}
									checkedPermissions={checkedPermissions}
									setCheckedPermissions={
										setCheckedPermissions
									}
									permissions={permissions}
								/>
							</FormField>
						)}
					</FormFields>

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
				</form>
			</ContentContainer>
		</>
	);
};

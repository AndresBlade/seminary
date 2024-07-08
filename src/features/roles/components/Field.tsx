import { Permission } from '../interfaces/Permission';
import RolesCSS from '../styles/roles.module.css';

interface Props {
	permission: Permission;
	setCheckedPermissions: React.Dispatch<
		React.SetStateAction<{ id: number; checked: boolean }[] | null>
	>;
	checkedPermissions: { id: number; checked: boolean }[] | null;
}

export const Field = ({
	permission: { id: value },
	setCheckedPermissions,
	checkedPermissions,
}: Props) => {
	const checked = checkedPermissions?.find(
		checkedPermission => checkedPermission.id === value
	)?.checked;

	return (
		<input
			type="checkbox"
			id="permission"
			name="permissions"
			className={RolesCSS.permissionInput}
			value={value}
			checked={checked}
			onChange={({ target: { checked } }) =>
				setCheckedPermissions(previousPermissions => {
					if (!previousPermissions) return previousPermissions;
					const checkedPermissions = previousPermissions.map(
						permission => {
							if (permission.id === value) {
								permission.checked = checked;
								return permission;
							}
							return permission;
						}
					);
					return checkedPermissions;
				})
			}
		/>
	);
};

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
	permission: { id: value, type },
	setCheckedPermissions,
	checkedPermissions,
}: Props) => {
	let className = '';

	const checked = checkedPermissions?.find(
		checkedPermission => checkedPermission.id === value
	)?.checked;

	if (type === 'C') className = RolesCSS['table-permission__tbody--input'];
	if (type === 'U')
		className = RolesCSS['table-permission__tbody--input-edit'];
	if (type === 'D')
		className = RolesCSS['table-permission__tbody--input-delete'];

	return (
		<td>
			<input
				type="checkbox"
				id="permission"
				name="permissions"
				className={className}
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
				// onChange={(e: any) => {
				// 	setPermissionsRoles(prevPermissions => {
				// 		const updatedPermissions = [...prevPermissions];
				// 		updatedPermissions[e.target.value] = Number(
				// 			!updatedPermissions[e.target.value]
				// 		);
				// 		return updatedPermissions;
				// 	});
				// }}
			/>
		</td>
	);
};

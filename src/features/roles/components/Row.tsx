import { useEffect, useState } from 'react';
import { Permission } from '../interfaces/Permission';
import { PermissionType } from '../interfaces/PermissionType';
import RolesCSS from '../styles/roles.module.css';
import { Field } from './Field';

interface Props {
	permissions: Permission[];
	setCheckedPermissions: React.Dispatch<
		React.SetStateAction<{ id: number; checked: boolean }[] | null>
	>;
	checkedPermissions: { id: number; checked: boolean }[] | null;
}

function PermissionTypeValue(type: PermissionType): number {
	if (type === 'R') return 1;
	if (type === 'C') return 2;
	if (type === 'U') return 3;
	return 4;
}

export const Row = ({
	permissions,
	setCheckedPermissions,
	checkedPermissions,
}: Props) => {
	const [totalAccess, setTotalAccess] = useState(false);

	useEffect(() => {
		if (!checkedPermissions) return;
		const rowPermissions = checkedPermissions.filter(checkedPermission =>
			permissions.find(
				permission => permission.id === checkedPermission.id
			)
		);

		const areAllPermissionsChecked = rowPermissions.every(
			permission => permission.checked
		);

		setTotalAccess(areAllPermissionsChecked);
	}, [checkedPermissions, permissions]);

	permissions.sort(
		(permissionA, permissionB) =>
			PermissionTypeValue(permissionA.type) -
			PermissionTypeValue(permissionB.type)
	);
	return (
		<div className={RolesCSS.row}>
			<input
				type="checkbox"
				id="permission"
				name="permissions"
				className={RolesCSS.permissionInput}
				checked={totalAccess}
				onChange={({ target: { checked } }) => {
					setCheckedPermissions(previousPermissions => {
						if (!previousPermissions) return null;
						const rowPermissions = previousPermissions.filter(
							checkedPermission =>
								permissions.find(
									permission =>
										permission.id === checkedPermission.id
								)
						);

						const newPermissions = previousPermissions.map(
							previousPermission => {
								const rowPermission = rowPermissions.find(
									rowPermission =>
										rowPermission.id ===
										previousPermission.id
								);
								if (rowPermission) {
									rowPermission.checked = checked;
									return rowPermission;
								}
								return previousPermission;
							}
						);

						return newPermissions;
					});
					setTotalAccess(checked);
				}}
			/>
			{permissions.map((permission, index) => (
				<Field
					checkedPermissions={checkedPermissions}
					setCheckedPermissions={setCheckedPermissions}
					key={index}
					permission={permission}
				/>
			))}
		</div>
	);
};

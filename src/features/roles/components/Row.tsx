import { Permission } from '../interfaces/Permission';
import { PermissionType } from '../interfaces/PermissionType';
import RolesCSS from '../styles/roles.module.css';
import { Field } from './Field';

interface Props {
	tableName: string;
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
	tableName,
	permissions,
	setCheckedPermissions,
	checkedPermissions,
}: Props) => {
	permissions.sort(
		(permissionA, permissionB) =>
			PermissionTypeValue(permissionA.type) -
			PermissionTypeValue(permissionB.type)
	);
	return (
		<tr className={RolesCSS['table-permission__tbody--tr']}>
			<td>{tableName}</td>
			<tr className={RolesCSS['table-permission__tbody--options']}>
				{permissions.map((permission, index) => (
					<Field
						checkedPermissions={checkedPermissions}
						setCheckedPermissions={setCheckedPermissions}
						key={index}
						permission={permission}
					/>
				))}
				{/* <td>
					<input
						type="checkbox"
						id="permission"
						value={9}
						onChange={(e: any) => {
							setPermissionsRoles(prevPermissions => {
								const updatedPermissions = [...prevPermissions];
								updatedPermissions[e.target.value] = Number(
									!updatedPermissions[e.target.value]
								);
								return updatedPermissions;
							});
						}}
					/>
				</td>
				<td>
					<input
						type="checkbox"
						id="permission"
						className={RolesCSS['table-permission__tbody--input']}
						value={10}
						onChange={(e: any) => {
							setPermissionsRoles(prevPermissions => {
								const updatedPermissions = [...prevPermissions];
								updatedPermissions[e.target.value] = Number(
									!updatedPermissions[e.target.value]
								);
								return updatedPermissions;
							});
						}}
					/>
				</td>
				<td>
					<input
						type="checkbox"
						id="permission"
						className={
							RolesCSS['table-permission__tbody--input-edit']
						}
						value={11}
						onChange={(e: any) => {
							setPermissionsRoles(prevPermissions => {
								const updatedPermissions = [...prevPermissions];
								updatedPermissions[e.target.value] = Number(
									!updatedPermissions[e.target.value]
								);
								return updatedPermissions;
							});
						}}
					/>
				</td>
				<td>
					<input
						type="checkbox"
						id="permission"
						className={
							RolesCSS['table-permission__tbody--input-delete']
						}
						value={12}
						onChange={(e: any) => {
							setPermissionsRoles(prevPermissions => {
								const updatedPermissions = [...prevPermissions];
								updatedPermissions[e.target.value] = Number(
									!updatedPermissions[e.target.value]
								);
								return updatedPermissions;
							});
						}}
					/>
				</td> */}
			</tr>
		</tr>
	);
};

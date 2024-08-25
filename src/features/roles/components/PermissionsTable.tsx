import { CheckedPermission } from '../interfaces/CheckedPermission';
import { Permission } from '../interfaces/Permission';
import TableCSS from '../../subject/styles/Table.module.css';
import { TableColumn } from '../../subject/components/TableColumn';
import { Field } from './Field';

interface Props {
	tables: string[];
	checkedPermissions: CheckedPermission[];
	setCheckedPermissions: React.Dispatch<
		React.SetStateAction<CheckedPermission[] | null>
	>;
	permissions: Permission[];
}

const groupPermissionsByType = (permissions: Permission[]) =>
	permissions.reduce(
		(group: Record<string, Permission[]>, permission: Permission) => {
			const { type } = permission;

			if (!group[type]) {
				group[type] = group[type] ?? [];
			}
			group[type].push(permission);
			return group;
		},
		{}
	);

export const PermissionsTable = ({
	tables,
	checkedPermissions,
	setCheckedPermissions,
	permissions,
}: Props) => {
	const permissionsByType = groupPermissionsByType(permissions);
	const classNames = tables.map((_, index) =>
		index % 2 === 1 ? TableCSS.cell : TableCSS.deactivatedCell
	);
	return (
		<div className={TableCSS.table}>
			<TableColumn
				content={tables}
				type="content"
				title="Tabla"
				classNames={classNames}
			/>
			{Object.keys(permissionsByType).map((key, indexOfType) => {
				const title =
					key === 'C'
						? 'Crear'
						: key === 'U'
						? 'Editar'
						: key === 'D'
						? 'Eliminar'
						: 'Leer';
				return (
					<TableColumn title={title} key={indexOfType} type="element">
						{tables.map((table, index) => {
							const permission = permissionsByType[key].find(
								permission => permission.table === table
							);
							return (
								<div className={classNames[index]} key={index}>
									{permission && (
										<Field
											checkedPermissions={
												checkedPermissions
											}
											permission={permission}
											setCheckedPermissions={
												setCheckedPermissions
											}
										/>
									)}
								</div>
							);
						})}
					</TableColumn>
				);
			})}
		</div>
	);
};

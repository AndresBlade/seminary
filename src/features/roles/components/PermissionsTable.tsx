import { CheckedPermission } from '../interfaces/CheckedPermission';
import { Permission } from '../interfaces/Permission';
import RolesCSS from '../styles/roles.module.css';
import { Routes } from './Routes';
import { Row } from './Row';

interface Props {
	tables: string[];
	permissionsByRoute: Record<string, Permission[]>;
	checkedPermissions: CheckedPermission[];
	setCheckedPermissions: React.Dispatch<
		React.SetStateAction<CheckedPermission[] | null>
	>;
}

export const PermissionsTable = ({
	tables,
	permissionsByRoute,
	checkedPermissions,
	setCheckedPermissions,
}: Props) => {
	return (
		<div className={RolesCSS.table}>
			<Routes tables={tables} />
			<div className={RolesCSS.permissions}>
				<div className={RolesCSS.headers}>
					<p>Acceso Total</p>
					<p>Ver</p>
					<p>Crear</p>
					<p>Editar</p>
					<p>Eliminar</p>
				</div>
				<div className={RolesCSS.rows}>
					{tables?.map(
						(table, index) =>
							permissionsByRoute && (
								<Row
									checkedPermissions={checkedPermissions}
									setCheckedPermissions={
										setCheckedPermissions
									}
									key={index}
									permissions={permissionsByRoute[table]}
								/>
							)
					)}
				</div>
			</div>
		</div>
	);
};

import RolesCSS from '../styles/roles.module.css';
export const RoleListHeaders = () => {
	return (
		<div className={RolesCSS['roles-table__thead']}>
			<div className={RolesCSS['roles-table__header']}>
				<p>Rol</p>
			</div>
			<div className={RolesCSS['roles-table__header']}>
				<p>Descripción</p>
			</div>
			<div className={RolesCSS['roles-table__header']}>
				<p>Acciones</p>
			</div>
		</div>
	);
};

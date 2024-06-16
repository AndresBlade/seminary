import { Role } from '../interfaces/Role';
import { RoleList } from './RoleList';
import { RoleListHeaders } from './RoleListHeaders';
import RolesCSS from '../styles/roles.module.css';

interface Props {
	roles: Role[];
	loading: boolean;
	error: unknown;
	setRoles: React.Dispatch<React.SetStateAction<Role[] | null>>;
}

export const RoleTable = ({ roles, loading, error, setRoles }: Props) => {
	return (
		<div className={RolesCSS['roles-table__table']}>
			<RoleListHeaders />
			<RoleList
				roles={roles}
				loading={loading}
				error={error}
				setRoles={setRoles}
			/>
		</div>
	);
};

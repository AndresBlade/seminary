import { Role } from '../interfaces/Role';
import RolesCSS from '../styles/roles.module.css';
import { LoadingRolesAnimation } from './LoadingRolesAnimation';
import { RoleRow } from './RoleRow';

interface Props {
	roles: Role[];
	loading: boolean;
	error: unknown;

	setRoles: React.Dispatch<React.SetStateAction<Role[] | null>>;
}

export const RoleList = ({ roles, loading, error, setRoles }: Props) => {
	return (
		<div className={RolesCSS['roles-table__tbody']}>
			{loading ? (
				<LoadingRolesAnimation />
			) : error ? (
				<div>
					<p>Error al cargar los datos</p>
				</div>
			) : (
				roles?.map((role, index) => {
					return (
						<RoleRow key={index} role={role} setRoles={setRoles} />
					);
				})
			)}
		</div>
	);
};

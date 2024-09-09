import RolesCSS from '../styles/roles.module.css';
import DeleteIcon from '../../../assets/deleteIcon.svg';
import EditIcon from '../../../assets/editIcon.svg';
import { Role } from '../interfaces/Role';
import { useNavigate } from 'react-router-dom';
import { deleteRole } from '../helpers/deleteRole';
import { getRoles } from '../helpers/getRoles';
import { useContext } from 'react';
import { AuthContext } from '../../login/context/AuthContext';

interface Props {
	role: Role;

	setRoles: React.Dispatch<React.SetStateAction<Role[] | null>>;
}

export const RoleRow = ({
	role: { id, name, description },
	setRoles,
}: Props) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	return (
		<div className={RolesCSS['roles-table__row']}>
			<p>{name}</p>
			<p>{description}</p>
			<div className={RolesCSS['roles-table__actions']}>
				<button
					className={RolesCSS['roles-table__action']}
					onClick={() => {
						navigate(`${id}`);
					}}
				>
					<img src={EditIcon} alt="Editar" />
				</button>
				<button
					className={RolesCSS['roles-table__action']}
					onClick={e => {
						e.preventDefault();
						if (
							confirm('Estás seguro de querer eliminar este rol?')
						)
							deleteRole(id)
								.then(() => user && getRoles(user.token))
								.then(roles => setRoles(roles))
								.catch(err => console.log(err));
					}}
				>
					<img src={DeleteIcon} alt="Eliminar" />
				</button>
			</div>
		</div>
	);
};

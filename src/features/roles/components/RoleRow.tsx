import RolesCSS from '../styles/roles.module.css';
import DeleteIcon from '../../../assets/deleteIcon.svg';
import EditIcon from '../../../assets/editIcon.svg';
import { Role } from '../interfaces/Role';

interface Props {
	role: Role;
	setRoleToDelete: React.Dispatch<React.SetStateAction<number>>;
}

export const RoleRow = ({
	role: { id, name, description },
	setRoleToDelete,
}: Props) => {
	return (
		<div className={RolesCSS['roles-table__row']}>
			<p>{name}</p>
			<p>{description}</p>
			<div className={RolesCSS['roles-table__actions']}>
				<button className={RolesCSS['roles-table__action']}>
					<img src={EditIcon} alt="Editar" />
				</button>
				<button
					className={RolesCSS['roles-table__action']}
					onClick={() => {
						setRoleToDelete(id);
					}}
				>
					<img src={DeleteIcon} alt="Eliminar" />
				</button>
			</div>
		</div>
	);
};

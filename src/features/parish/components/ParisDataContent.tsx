import React, { HTMLAttributes, FC, Dispatch } from 'react';
import Parish from '../styles/parish.module.css';
import EditIcon from '../../../assets/editIcon.svg';
import DeleteIcon from '../../../assets/deleteIcon.svg';
import { useNavigate } from 'react-router-dom';
export interface ParishDataContentProps {
	parroquia: string;
	parroco: string;
	id: number;
	setParroquiaDelete: Dispatch<React.SetStateAction<number>>;
	parroquiaDelete: number;
}
export type ParisDataContentProp = HTMLAttributes<HTMLDivElement> &
	ParishDataContentProps;

const ParisDataContent: FC<ParishDataContentProps> = ({
	id,
	parroquia,
	parroco,
	setParroquiaDelete,
}) => {
	const navigate = useNavigate();

	return (
		<div className={Parish['data-content']} key={id}>
			<p>{parroquia}</p>
			<p>{parroco}</p>
			<div className={Parish['data-buttons']}>
				<button
					onClick={() => {
						navigate(`./${id}`);
					}}
				>
					<img src={EditIcon} alt="Editar" />
				</button>
				<button
					type="button"
					onClick={() => {
						if (
							confirm(
								'Estás seguro de querer eliminar este registro?'
							)
						)
							setParroquiaDelete(id);
					}}
				>
					<img src={DeleteIcon} alt="Eliminar" />
				</button>
			</div>
		</div>
	);
};

export default ParisDataContent;

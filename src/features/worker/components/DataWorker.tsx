import React, { SetStateAction, useContext } from 'react';
import WorkerCSS from '../styles/WokerCSS.module.css';
import { dataGetWorker } from '../interfaces/worker';
import deleteIcon from '../../../assets/deleteIcon.svg';
import editIcon from '../../../assets/editIcon.svg';
import { useNavigate } from 'react-router-dom';
import contactIcon from '../../../assets/MaterialSymbolsIdCardOutline.svg';
import { getCardWorker } from '../helpers/GetCardWorker';
import { AuthContext } from '../../login/context/AuthContext';

interface dataWorkerProps {
	dataWorkerToList: dataGetWorker[] | null;
	setWorkerDelete: React.Dispatch<SetStateAction<string>>;
}

export const DataWorker = ({
	dataWorkerToList,
	setWorkerDelete,
}: dataWorkerProps) => {
	const {user} = useContext(AuthContext)
	const navigate = useNavigate();
	const token = user?.token
	return (
		<div className={WorkerCSS.dataWorkerContainer}>
			{dataWorkerToList === null ? (
				<p>No hay datos para mostrar</p>
			) : (
				dataWorkerToList?.map(worker => (
					<div
						key={worker.person.id}
						className={WorkerCSS.dataWorker}
					>
						<p>{worker.person.id}</p>
						<p>
							{worker.person.forename +
								' ' +
								worker.person.surname}
						</p>
						<p>{worker.position}</p>
						<div className={WorkerCSS.buttonsActions}>
							<button onClick={()=>{
								token && getCardWorker({id:worker.person.id,token:token}).catch(error=>{
									alert('Error al mostrar la ficha del trabajador')
									console.log(error)
								})
							}}>
								<img src={contactIcon} alt="ficha" />
							</button>
							<button
								onClick={() => {
									navigate(`${worker.person.id}`);
								}}
							>
								<img src={editIcon} alt="Editar" />
							</button>
							<button
								type="button"
								onClick={e => {
									e.preventDefault();
									if (
										confirm(
											'Estás seguro de querer eliminar a este trabajador?'
										)
									)
										setWorkerDelete(worker.person.id);
								}}
							>
								<img src={deleteIcon} alt="Eliminar" />
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
};

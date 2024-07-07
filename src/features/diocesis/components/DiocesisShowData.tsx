import Diocesis from '../styles/diocesis.module.css';
import DeleteIcon from '../../../assets/deleteIcon.svg';
import EditIcon from '../../../assets/editIcon.svg';
import UseGet from '../../../shared/hooks/useGet';
import useApiDelete from '../../../shared/hooks/useDelete';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDiocese } from '../helpers/getDiocese';
import { getDioceseByName } from '../helpers/getDioceseByName';
import { AuthContext } from '../../login/context/AuthContext';

interface Diocesis {
	id: number;
	name: string;
	holder: string;
}
const DiocesisShowData = () => {
	const apiUrl = 'http://127.0.0.1:3000/Diocese/';
	const [diocesisDelete, setDiocesisDelete] = useState<number>(0); // [1
	const {
		data,
		loading,
		error,
		setData: setDiocese,
	} = UseGet<Diocesis[]>(apiUrl);
	const { deleteData } = useApiDelete({ apiUrl, idDelete: diocesisDelete });
	const [diocesisFind, setDiocesisFind] = useState('');
	const [find, setFind] = useState('');
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	console.log(user?.token);

	useEffect(() => {
		if (!user) return;

		if (diocesisDelete !== 0) {
			deleteData()
				.then(() => {
					return getDiocese(user.token);
				})
				.then(diocesis => setDiocese(diocesis))
				.catch(console.error);
		}
		if (!diocesisFind) {
			getDiocese(user.token)
				.then(diocesis => setDiocese(diocesis))
				.catch(console.error);
			return;
		}
		if (find) {
			getDioceseByName({ name: diocesisFind, token: user.token })
				.then(diocesis => setDiocese(diocesis))
				.catch(console.error);
			setFind('');
			return;
		}
	}, [diocesisDelete, deleteData, setDiocese, find, diocesisFind, user]);

	return (
		<div className={Diocesis['diocesis-table__table']}>
			<div className={Diocesis['diocesis-find']}>
				<input
					type="search"
					placeholder="Nombre de la Diocesis"
					value={diocesisFind}
					onChange={e => {
						setDiocesisFind(e.target.value);
					}}
				/>
				<button
					type="button"
					onClick={() => {
						setFind(diocesisFind);
					}}
				>
					Buscar
				</button>
			</div>
			<table
				className={
					!loading
						? Diocesis['diocesis-table__table--container']
						: Diocesis['diocesis-table__table--container-loading']
				}
			>
				<thead className={Diocesis['diocesis-table__table--thead']}>
					<tr>
						<th>Diócesis</th>
						<th>Obispo</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody className={Diocesis['diocesis-table__table--tbody']}>
					{loading ? (
						<tr className={Diocesis['animation-container']}>
							<td className={Diocesis['animation-loading']}></td>
							<td
								className={Diocesis['animation-loading__two']}
							></td>
						</tr>
					) : error ? (
						<tr>
							<td>Error al cargar los datos</td>
						</tr>
					) : data?.length === 0 ? (
						<tr>
							<td>No hay datos</td>
						</tr>
					) : (
						data?.map((diocesis: Diocesis) => {
							return (
								<tr
									key={diocesis.id}
									className={
										Diocesis[
											'diocesis-table__table--tbody-tr'
										]
									}
								>
									<td
										className={
											Diocesis[
												'diocesis-table__table--tbody-tr-name'
											]
										}
									>
										{diocesis.name}
									</td>
									<td
										className={
											Diocesis[
												'diocesis-table__table--tbody-tr-obispo'
											]
										}
									>
										{diocesis.holder}
									</td>
									<td
										className={
											Diocesis[
												'diocesis-table__button--container'
											]
										}
									>
										<button
											className={
												Diocesis[
													'diocesis-table__button--edit'
												]
											}
										>
											<img
												src={EditIcon}
												alt="Editar"
												onClick={() => {
													navigate(
														`./${diocesis.id}`
													);
												}}
											/>
										</button>
										<button
											className={
												Diocesis[
													'diocesis-table__button--delete'
												]
											}
											onClick={() => {
												setDiocesisDelete(diocesis.id);
											}}
										>
											<img
												src={DeleteIcon}
												alt="Eliminar"
											/>
										</button>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
};

export default DiocesisShowData;

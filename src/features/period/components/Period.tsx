import PeriodCSS from '../styles/PeriodCSS.module.css';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import DataHeader from './DataHeader';
import DataContent from './DataContent';
import AddIcon from '../../../assets/MaterialSymbolsAddCircleOutline.svg';
import Input from './Input';
import editIcon from '../../../assets/editIcon.svg';
import { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import Label from './Label';
import { CreatePeriod, GetPeriod } from '../interfaces/Period';
import { CreateAcademicPeriod } from '../helpers/CreateAcademicPeriod';
import { AuthContext } from '../../login/context/AuthContext';
import useGet from '../../../shared/hooks/useGet';
import { DeletePeriod } from '../helpers/DeletePeriod';
import { GetPeriods } from '../helpers/GetPeriods';
import { UpdateUser } from '../helpers/UpdateUser';
import { GetPeriodUpdate } from '../helpers/GetPeriodUpdate';
import { UpdateSemester } from '../helpers/UpdateSemester';
import { Animation } from '../../../shared/animation/Animation';
import { ActivateSemester } from '../helpers/ActivateSemester';
import { FindPeriod } from '../helpers/FindPeriod';
import { ActiveAcademicTermContext } from '../context/ActiveAcademicTermContext';

export const Period = () => {
	const apiUrl = `${import.meta.env.VITE_URL}/AcademicTerm`;
	const { user } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);
	const [deletePeriod, setDeletePeriod] = useState(0);
	const { data, loading, error, setData } = useGet<GetPeriod[]>(apiUrl);
	const [updateUser, setUpdateUser] = useState(0);
	const [updateSemester, setUpdateSemester] = useState(0);
	const [activateSemester, setActivateSemester] = useState(0);
	const [date, setDate] = useState('');
	const [dateFind, setDateFind] = useState('');
	const [semester, setSemester] = useState({
		semesterNumber: 0,
		semesterId: 0,
	});
	const [createPeriod, setCreatePeriod] = useState<CreatePeriod>({
		start_date: '',
		end_date: '',
	});

	const { setIsThereActiveAcademicTerm } = useContext(
		ActiveAcademicTermContext
	);

	useEffect(() => {
		data?.forEach(semester => {
			if (semester.status === 'ACTIVO') {
				setSemester({
					semesterNumber: semester.semester,
					semesterId: semester.id,
				});
				return;
			}
		});
	}, [data]);

	useEffect(() => {
		if (!user?.token) return;
		if (deletePeriod !== 0) {
			DeletePeriod({
				id: deletePeriod.toString(),
				token: user?.token,
				url: apiUrl,
			})
				.then(() => {
					alert('Eliminado correctamente');
					setIsThereActiveAcademicTerm(false);
					console.log('there isnt');
					setDeletePeriod(0);
					setSemester({
						semesterNumber: 0,
						semesterId: 0,
					});
					return GetPeriods(user.token);
				})
				.then(period => setData(period))
				.catch(error => {
					console.log(error);
					alert('Error al eliminar' + error);
				});
		}
		if (updateUser > 0) {
			GetPeriodUpdate({ id: updateUser,token:user.token })
				.then(response => {
					setCreatePeriod({
						start_date: response.start_strin,
						end_date: response.end_string,
					});
				})
				.catch(error => {
					console.log(error);
					alert('Error al traer datos para actualizar');
					return GetPeriods(user.token);
				});
		}
		if (updateSemester > 0) {
			console.log('que quiere el pueblo? Seeeeeeeettttzoooooooooooooo');
			UpdateSemester(updateSemester, user.token)
				.then(response => {
					if (response.ok) {
						alert('Semestre actualizado correctamente');
						setUpdateSemester(0);
						return GetPeriods(user.token)
							.then(response => {
								setData(response);
							})
							.catch(error => {
								console.error(error);
								alert('error al traer datos para listar');
							});
					}
				})
				.catch(error => {
					setUpdateSemester(0);
					console.error(error);
					alert('Error al actualizar semestre');
				});
		}

		if (activateSemester > 0) {
			alert('Que quiere el pueblo?? Seeeetttzzzoooooooooooooo');
			ActivateSemester({
				id: Number(activateSemester),
				token: user.token,
			})
				.then(response => {
					if (response.ok) {
						alert('Activado correctamente');
						setActivateSemester(0);
						return GetPeriods(user.token)
							.then(response => {
								setData(response);
							})
							.catch(error => {
								console.error(error);
								alert('error al traer datos para listar');
							});
					} else {
						throw new Error();
					}
				})
				.catch(error => {
					console.error(error);
					alert('error al activar semestre');
				});
		}

		if (dateFind.length > 0) {
			FindPeriod({ date: dateFind,token:user.token })
				.then(response => {
					console.log(response);
					setData(response);
					setDateFind('');
				})
				.catch(error => {
					alert('Error al buscar los datos');
					console.error(error);
				});
		}
		if (date === '') {
			GetPeriods(user.token)
				.then(response => {
					setData(response);
				})
				.catch(error => {
					console.log(error);
					alert('error al traer los datos');
				});
		}
	}, [
		deletePeriod,
		user?.token,
		setData,
		updateUser,
		updateSemester,
		activateSemester,
		dateFind,
		date,
	]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user?.token) return;

		if (updateUser === 0) {
			CreateAcademicPeriod({ data: createPeriod, token: user?.token })
				.then(response => {
					if (response.ok) {
						alert('Periodo creado exitosamente'),
							setShowModal(false),
							GetPeriods(user.token)
								.then(response => {
									setData(response);
									setIsThereActiveAcademicTerm(true);
									console.log('there is');
								})
								.catch(error => {
									console.log(error),
										alert('error al listar periodos');
								});
					}
				})
				.catch(error => {
					console.error(error);
					alert('Error al crear periodo' + error);
				});
		} else {
			UpdateUser({
				id: updateUser.toString(),
				token: user?.token,
				start_date: createPeriod.start_date,
				end_date: createPeriod.end_date,
			})
				.then(response => {
					if (response.ok) {
						alert('actualizado correctamente');
						setUpdateUser(0);
						setShowModal(false);
						return GetPeriods(user.token)
							.then(response => {
								setData(response);
							})
							.catch(error => {
								console.log(error),
									alert('error al listar periodos');
							});
					} else {
						throw new Error();
					}
				})
				.catch(error => {
					console.error(error);
					alert('Error al actualizar');
				});
		}
	};

	return (
		<ContentContainer>
			<div className={PeriodCSS.addPeriod}>
				<h2>Lista de períodos académicos</h2>
				{semester.semesterNumber ? (
					<button
						className={PeriodCSS.buttonAddPeriod}
						onClick={e => {
							e.preventDefault();
							{
								semester.semesterNumber === 1
									? setUpdateSemester(semester.semesterId)
									: setDeletePeriod(semester.semesterId);
							}
						}}
					>
						{semester.semesterNumber === 1
							? 'Ir a 2do Semestre'
							: 'Finalizar semestre'}
					</button>
				) : (
					<button
						className={PeriodCSS.buttonAddPeriod}
						onClick={e => {
							e.preventDefault();
							setShowModal(true);
						}}
					>
						<img src={AddIcon} alt="añadir" />
						Agregar nuevo
					</button>
				)}
				{semester.semesterNumber === 2 ? (
					<button
						className={PeriodCSS.buttonAddPeriod}
						onClick={e => {
							e.preventDefault();
							setUpdateSemester(semester.semesterId);
						}}
					>
						Volver a 1er semestre
					</button>
				) : null}
			</div>
			<div className={PeriodCSS.findPeriod}>
				<Input
					type="date"
					value={date}
					onChange={e => {
						setDate(e.target.value);
					}}
				/>
				<button
					className={PeriodCSS.buttonFind}
					onClick={e => {
						e.preventDefault();
						setDateFind(date);
					}}
				>
					Buscar
				</button>
			</div>

			<DataHeader>
				<p>Periodo</p>
				<p>Fecha inicio</p>
				<p>Fecha Final</p>
				<p>Semestre</p>
				<p>Actual</p>
				<p className={PeriodCSS.dataHeaderActions}>Acciones</p>
			</DataHeader>
			{loading ? (
				<Animation></Animation>
			) : error ? (
				<p>Error al traer los datos</p>
			) : data?.length === 0 ? (
				<p>No hay datos</p>
			) : (
				data?.map(period => (
					<DataContent key={period.id}>
						<p>{period.name}</p>
						<p>{period.start_strin}</p>
						<p>{period.end_string}</p>
						<p className={PeriodCSS.dataContentSemester}>
							{period.semester}
						</p>
						<p>{period.status}</p>
						<div>
							<button
								className={PeriodCSS.buttonActions}
								onClick={() => {
									setUpdateUser(period.id);
									setTimeout(() => {
										setShowModal(true);
									}, 1000);
								}}
							>
								<img src={editIcon} alt="editar" />
							</button>
						</div>
					</DataContent>
				))
			)}

			{showModal ? (
				<Modal setShowModal={setShowModal}>
					<p className={PeriodCSS.titleModal}>
						Agregar periodo academico
					</p>

					<form action="POST" onSubmit={handleSubmit}>
						<Label>Fecha Inicio</Label>
						<Input
							type="date"
							value={createPeriod.start_date}
							onChange={e => {
								e.preventDefault();
								setCreatePeriod(period => {
									return {
										...period,
										start_date: e.target.value,
									};
								});
							}}
							required
						/>
						<Label>Fecha Culminación</Label>
						<Input
							type="date"
							value={createPeriod.end_date}
							onChange={e => {
								e.preventDefault();
								setCreatePeriod(period => {
									return {
										...period,
										end_date: e.target.value,
									};
								});
							}}
							required
						/>

						<button type="submit" className={PeriodCSS.buttonSave}>
							Guardar
						</button>
					</form>
				</Modal>
			) : null}
		</ContentContainer>
	);
};

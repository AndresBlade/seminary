import Parish from '../features/parish/styles/parish.module.css';
import ParisDataContent from '../features/parish/components/ParisDataContent';
import UseGet from '../shared/hooks/useGet';
import { GetParish } from '../features/parish/helpers/GetParish';
import { useEffect, useState } from 'react';
import useDelete from '../shared/hooks/useDelete';
import { GetParishByName } from '../features/parish/helpers/GetParishByName';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { ContentContainer } from '../features/ui/container/components/ContentContainer';
import { Input } from '../features/subject/components/FormInput';

interface ParishDataProps {
	msj: string;
	parishrepository: ParishDataContentPropss[];
}
export interface ParishDataContentPropss {
	id: number;
	diocese_id: number;
	name: string;
	patron: string;
}

export const ParishShowData = () => {
	const apiUrl = 'http://127.0.0.1:3000/parish/';
	const {
		data,
		loading,
		error,
		setData: setParish,
	} = UseGet<ParishDataProps>(apiUrl);
	const [parroquiaDelete, setParroquiaDelete] = useState<number>(0);
	const { deleteData } = useDelete({ apiUrl, idDelete: parroquiaDelete });
	const [parishFind, setParishFind] = useState<string>('');
	const [find, setFind] = useState<string>('');

	useEffect(() => {
		if (parroquiaDelete !== 0) {
			deleteData()
				.then(() => {
					alert('Parroquia eliminada');
					setParroquiaDelete(0)
					return GetParish();
				})
				.then(parroquia => setParish(parroquia))
				.catch(error => {
					console.log(error);
				});
		}
		if (!parishFind) {
			GetParish()
				.then(parroquia => {
					setParish(parroquia);
				})
				.catch(error => {
					console.log(error);
				});
			return;
		}
		if (find) {
			GetParishByName({ name: find })
				.then(parroquia =>
					setParish({
						msj: parroquia.msj,
						parishrepository: parroquia.parish,
					})
				)
				.catch(error => {
					console.log(error);
				});
			setFind('');
			return;
		}
	}, [parroquiaDelete, setParish, deleteData, find, parishFind]);
	return (
		<>
			<TitleList>
				<Title content="Parroquias" />
				<BackgroundColoredSubtitle content="Agregar parroquia" />
			</TitleList>

			<ContentContainer>
				<div className={Parish['parish-find']}>
					<Input
						type="search"
						onInputChange={e => {
							setParishFind(e.target.value);
						}}
						placeholder="Nombre de la parroquia"
						value={parishFind}
					/>
					{/* <input
						type="search"
						placeholder="Nombre de la Parroquia"
						value={parishFind}
						onChange={e => {
							setParishFind(e.target.value);
						}}
					/> */}
					<button
						type="button"
						onClick={() => {
							setFind(parishFind);
						}}
					>
						Buscar
					</button>
				</div>

				<div className={Parish['data-show__title']}>
					<h2>Parroquia</h2>
					<h2>Parroco</h2>
					<h2>Acciones</h2>
				</div>
				<div className={Parish['data-content__container']}>
					{loading ? (
						<div className={Parish['animation-container']}>
							<div className={Parish['animation-loading']}></div>
							<div
								className={Parish['animation-loading__two']}
							></div>
						</div>
					) : error ? (
						<div>
							<p>Error al cargar los datos</p>
						</div>
					) : data?.parishrepository === undefined ? (
						<tr>
							<td>No hay datos</td>
						</tr>
					) : (
						data?.parishrepository.map(parish => {
							return (
								<ParisDataContent
									key={parish.id}
									id={parish.id}
									parroquia={parish.name}
									parroco={parish.patron}
									setParroquiaDelete={setParroquiaDelete}
									parroquiaDelete={parroquiaDelete}
								/>
							);
						})
					)}
				</div>
			</ContentContainer>
		</>
	);
};

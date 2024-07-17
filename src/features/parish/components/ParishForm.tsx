import { useEffect, useState } from 'react';
import Parish from '../styles/parish.module.css';
import useGet from '../../../shared/hooks/useGet';
import { CreateParish } from '../helpers/CreateParish';
import { useNavigate, useParams } from 'react-router-dom';
import useGetEdit from '../../../shared/hooks/useGetEdit';
import { EditParish } from '../helpers/EditParish';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { FormFields } from '../../subject/components/FormFields';
import { InputFormField } from '../../subject/components/InputFormField';
import { SelectFormField } from '../../subject/components/SelectFormField';
import FormCSS from '../../subject/styles/SubjectForm.module.css';

interface ParishFormProps {
	e: React.FormEvent<HTMLFormElement>;
	parishName: string;
	parroco: string;
	diocesis: number;
}
interface DiocesisProps {
	id: number;
	name: string;
	holder: string;
}

interface ParishData {
	msj: string;
	parish: {
		id: number;
		diocese_id: number;
		name: string;
		patron: string;
	};
}
export const ParishForm = () => {
	const { id } = useParams();
	const apiUrl = 'http://localhost:3000/Diocese/';
	const apiUrlParish = `http://localhost:3000/parish/${id}`;
	const [parishName, setParishName] = useState('');
	const [parroco, setParroco] = useState('');
	const [diocesis, setDiocesis] = useState(0);
	const { data } = useGet<DiocesisProps[]>(apiUrl);
	const { dataEdit } = useGetEdit<ParishData>(apiUrlParish);
	const navigate = useNavigate();

	useEffect(() => {
		if (isNaN(Number(id))) return;
		if (!dataEdit) return;

		setDiocesis(dataEdit?.parish.diocese_id);
		setParishName(dataEdit?.parish.name);
		setParroco(dataEdit?.parish.patron);
	}, [dataEdit, data, id]);

	const handleSubmit = ({
		e,
		parishName,
		parroco,
		diocesis,
	}: ParishFormProps) => {
		e.preventDefault();
		if (parishName === '' || diocesis === 0 || parroco === '') {
			alert('Faltan campos por llenar');
			return;
		} else {
			if (isNaN(Number(id))) {
				CreateParish({
					dioceseId: diocesis,
					name: parishName,
					parishPriest: parroco,
				})
					.then(response => {
						if (response.ok) {
							alert('Parroquia creada con éxito');
							navigate('..');
						} else {
							alert('Error al crear la parroquia');
							return;
						}
					})
					.catch(error => {
						alert('Error al crear la parroquia');
						console.log(error);
						return;
					});
			} else {
				EditParish({
					id: Number(id),
					diocesesId: diocesis,
					name: parishName,
					parishPriest: parroco,
				})
					.then(response => {
						if (response.ok) {
							alert('Parroquia editada con éxito');
							navigate('..');
						}
						return;
					})
					.catch(error => {
						alert('Error al editar la parroquia');
						console.log(error);
						return;
					});
			}
		}
	};
	return (
		<ContentContainer>
			<form
				onSubmit={e => {
					handleSubmit({ e, parishName, parroco, diocesis });
				}}
				className={FormCSS.form}
			>
				<FormFields>
					<InputFormField
						labelText="Nombre de la parroquia *"
						id="name"
						type="text"
						onInputChange={e => {
							setParishName(e.target.value);
						}}
					/>

					<InputFormField
						labelText="Parroco"
						id="parroco"
						type="text"
						onInputChange={e => {
							setParroco(e.target.value);
						}}
					/>

					{data && (
						<SelectFormField
							labelText="Diócesis a la que pertenece"
							options={data?.map(diocesis => ({
								content: diocesis.name,
								value: diocesis.id.toString(),
								id: diocesis.id.toString(),
							}))}
							onSelectChange={e => {
								setDiocesis(parseInt(e.target.value));
							}}
						/>
					)}
				</FormFields>
				{/* <div className={Parish['parish-create__form-inputs']}>
					<div className={Parish['parish-create__form-name']}>
						<label
							htmlFor="name"
							className={
								Parish['parish-create__form-name--label']
							}
						>
							Nombre de la parroquia*
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={parishName}
							onChange={e => {
								setParishName(e.target.value);
							}}
						/>
					</div>
					<div className={Parish['parish-create__form-parroco']}>
						<label
							htmlFor="description"
							className={
								Parish['parish-create__form-parroco--label']
							}
						>
							Parroco
						</label>
						<input
							type="text"
							id="parroco"
							name="parroco"
							value={parroco}
							onChange={e => {
								setParroco(e.target.value);
							}}
						/>
					</div>
					<div className={Parish['parish-create__form-select']}>
						<label
							htmlFor="diocesis"
							className={
								Parish['parish-create__form-diocesis--label']
							}
						>
							Diocesis a la que pertenece
						</label>
						<select
							name="diocesis"
							id="diocesis"
							value={diocesis}
							onChange={e => {
								setDiocesis(parseInt(e.target.value));
							}}
						>
							<option value="0">Selecciona una diocesis</option>
							{data?.map(diocesis => (
								<option key={diocesis.id} value={diocesis.id}>
									{diocesis.name}
								</option>
							))}
						</select>
					</div>
				</div> */}
				<div className={Parish['parish-create__form-group']}>
					<button
						type="submit"
						className={Parish['parish-create__form-button--save']}
					>
						Guardar
					</button>
					<button
						type="reset"
						className={Parish['parish-create__form-button--reset']}
						onClick={() => {
							setParishName('');
							setParroco('');
							setDiocesis(0);
						}}
					>
						Limpiar
					</button>
				</div>
			</form>
		</ContentContainer>
	);
};

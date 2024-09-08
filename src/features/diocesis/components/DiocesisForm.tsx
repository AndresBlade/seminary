import React, { useContext, useEffect, useState } from 'react';
import Diocesis from '../styles/diocesis.module.css';
import { CreateDiocesis } from '../helpers/createDiocesis';
import { editDiocesis } from '../helpers/editDiocesis';
import { useParams, useNavigate } from 'react-router-dom';
import useGet from '../../../shared/hooks/useGet';
import { AuthContext } from '../../login/context/AuthContext';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { InputFormField } from '../../subject/components/InputFormField';
import { FormFields } from '../../subject/components/FormFields';
import FormCSS from '../../subject/styles/SubjectForm.module.css';

interface DiocesisFormProps {
	e: React.FormEvent<HTMLFormElement>;
	diocesisName: string;
	obispoName: string;
}
interface Diocesis {
	name: string;
	obispo: string;
}
interface DiocesisData {
	mjs: string;
	diocese: {
		id: number;
		name: string;
		holder: string;
	};
}
export const DiocesisForm = () => {
	const [diocesisName, setDiocesisName] = useState('');
	const [obispoName, setObispoName] = useState('');
	const { id } = useParams();
	const apiUrl = `${import.meta.env.VITE_URL}/Diocese/${Number(id)}`;
	const { data } = useGet<DiocesisData>(apiUrl);
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (isNaN(Number(id))) return;
		if (!data) return;

		setDiocesisName(data?.diocese.name);
		setObispoName(data?.diocese.holder);
	}, [data, id]);

	console.log(data);
	const handleSubmit = ({
		e,
		diocesisName,
		obispoName,
	}: DiocesisFormProps) => {
		e.preventDefault();
		if (diocesisName.length === 0 || obispoName.length === 0) {
			return alert('Por favor llene los campos');
		} else {
			const name = diocesisName;
			const obispo = obispoName;
			if (!user) return;
			if (isNaN(Number(id))) {
				CreateDiocesis({ name, obispo, token: user.token })
					.then(() => {
						navigate('..');
					})
					.catch(error => {
						console.log(error);
					});
				return;
			}
			editDiocesis({ id: Number(id), name, obispo, token: user.token })
				.then(() => {
					navigate('..');
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	console.log(id);

	return (
		<ContentContainer>
			<form
				action="POST"
				onSubmit={e => {
					handleSubmit({ e, diocesisName, obispoName });
				}}
				className={FormCSS.form}
			>
				<FormFields>
					<InputFormField
						onInputChange={e => {
							setDiocesisName(e.target.value.toUpperCase());
						}}
						labelText="Nombre de la diócesis *"
						value={diocesisName}
						id="name"
						type="text"
					/>
					<InputFormField
						onInputChange={e => {
							setObispoName(e.target.value.toUpperCase());
						}}
						labelText="Obispo que la dirige"
						value={obispoName}
						id="obispo"
						type="text"
					/>
				</FormFields>
				<div className={Diocesis['diocesis-create__form-group']}>
					<button
						disabled={diocesisName.length === 0 || obispoName.length === 0}
						type="submit"
						className={
							Diocesis['diocesis-create__form-button--save']
						}
					>
						Guardar
					</button>
					<button
						type="reset"
						className={
							Diocesis['diocesis-create__form-button--reset']
						}
					>
						Limpiar
					</button>
				</div>
			</form>
		</ContentContainer>
	);
};

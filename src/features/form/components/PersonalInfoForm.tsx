import FormCSS from '../styles/FormCSS.module.css';
import { LabelForm } from './small_components/LabelForm';
import { InputForm } from './small_components/InputForm';
import { SelectForm } from './small_components/SelectForm';
import { TitleForm } from './small_components/TitleForm';
import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { getDiocese, Diocese } from '../../diocesis/helpers/getDiocese';
import { blood } from '../interfaces/Form';
import { personalInfoProps } from '../interfaces/Form';
import { GetBlood } from '../helpers/GetBlood';
import { AuthContext } from '../../login/context/AuthContext';
import { GetParishByDiocese } from '../helpers/GetParishByDiocese';
import { getParishByDioceseProps } from '../interfaces/Form';

interface personalInfoPropsForm {
	name: string;
	lastName: string;
	id: string;
	birthDate: string;
	bloodType: string;
	medicalRecord: string;
	rol: string;
	diocese?: string;
	parish?: string;
	setPersonalInfo: Dispatch<SetStateAction<personalInfoProps>>;
	idEdit: string | undefined;
	setLetterId: Dispatch<SetStateAction<string>>;
	letterId: string;
}

export const PersonalInfoForm = ({
	name,
	lastName,
	id,
	birthDate,
	bloodType,
	medicalRecord,
	rol,
	diocese,
	parish,
	setPersonalInfo,
	idEdit,
	setLetterId,
	letterId,
}: personalInfoPropsForm) => {
	const { user } = useContext(AuthContext);
	const [bloodData, setBloodData] = useState<blood | null>(null);
	const [dioceseData, setDioceseData] = useState<Diocese[]>([]);
	const [parishByDiocese, setParishByDiocese] = useState<
		getParishByDioceseProps[]
	>([]);

	useEffect(() => {
		if (!user?.token) return;
		GetBlood(user?.token)
			.then(data => {
				setBloodData(data);
			})
			.catch(error => console.log(error));

		getDiocese(user.token)
			.then(data => {
				setDioceseData(data);
			})
			.catch(error => console.log(error));
	}, []);

	useEffect(() => {
		if (!user?.token) return;
		if (!diocese) return;
		GetParishByDiocese({ dioceseId: diocese, token: user?.token })
			.then(data => {
				setParishByDiocese(data);
			})
			.catch(error => {
				setParishByDiocese([
					{
						id: 0,
						diocese_id: 0,
						name: 'No hay parroquias',
						patron: 'no tiene',
					},
				]);
				alert(error);
				console.log(error);
			});
	}, [diocese]);

	console.log(diocese);
	return (
		<div className={FormCSS.personalInfo}>
			<TitleForm title="Información General" />

			<div>
				<LabelForm>Nombres</LabelForm>
				<InputForm
					placeholder="PEDRO"
					required
					type="text"
					id="name"
					value={name.toLocaleUpperCase()}
					onChange={e => {
						setPersonalInfo(personal => {
							return { ...personal, name: e.target.value };
						});
					}}
				/>
			</div>

			<div>
				<LabelForm>Apellidos</LabelForm>
				<InputForm
					placeholder="MENDOZA"
					required
					type="text"
					id="lastName"
					value={lastName.toLocaleUpperCase()}
					onChange={e => {
						setPersonalInfo(personal => {
							return { ...personal, lastName: e.target.value };
						});
					}}
				/>
			</div>

			<div className={FormCSS.selectIdLetter}>
				<LabelForm>Cédula</LabelForm>
				<div>
					<SelectForm
						value={letterId}
						onChange={e => {
							setLetterId(e.target.value);
						}}
					>
						<option value="V-">V-</option>
						<option value="E-">E-</option>
					</SelectForm>
					<InputForm
						min={1}
						required
						placeholder="000000000"
						type="number"
						id="id"
						minLength={6}
						value={id}
						onChange={e => {
							setPersonalInfo(personal => {
								return {
									...personal,
									id: Math.abs(+e.target.value).toString(),
								};
							});
						}}
						onKeyDown={(event) => {
							const allowedKeys = [
								'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Backspace',
								'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
							];
							if (!allowedKeys.includes(event.key)) {
								event.preventDefault();
							}
						}}
					/>
				</div>
			</div>

			<div>
				<LabelForm>Fecha de nacimiento</LabelForm>
				<InputForm
					required
					type="date"
					id="date"
					value={birthDate}
					onChange={e => {
						setPersonalInfo(personal => {
							return { ...personal, birthDate: e.target.value };
						});
					}}
				/>
			</div>

			<div>
				<LabelForm>Tipo de sangre</LabelForm>
				<SelectForm
					value={bloodType}
					onChange={e => {
						setPersonalInfo(personal => {
							return { ...personal, bloodType: e.target.value };
						});
					}}
				>
					{bloodData &&
						Object.entries(bloodData).map(blood => (
							<option value={blood[0]} key={blood[1]}>
								{blood[0]}
							</option>
						))}
				</SelectForm>
			</div>

			<div>
				<LabelForm>Condicion médica</LabelForm>
				<InputForm
					placeholder="Convulsiones"
					type="text"
					value={medicalRecord?.toLocaleUpperCase()}
					onChange={e => {
						setPersonalInfo(personal => {
							return {
								...personal,
								medicalRecord: e.target.value,
							};
						});
					}}
				/>
			</div>
			<div>
				<LabelForm>Diocesis</LabelForm>
				<SelectForm
					value={diocese}
					onChange={e => {
						setPersonalInfo(personal => {
							return { ...personal, diocese: e.target.value };
						});
					}}
				>
					{dioceseData.map(diocese => (
						<option value={diocese.id} key={diocese.id}>
							{diocese.name}
						</option>
					))}
				</SelectForm>
			</div>

			<div>
				<LabelForm>Parroquia</LabelForm>
				<SelectForm
					value={parish}
					onChange={e => {
						e.preventDefault();
						setPersonalInfo(personal => {
							return { ...personal, parish: e.target.value };
						});
					}}
				>
					{parishByDiocese.map(parish => (
						<option value={parish.id} key={parish.id}>
							{parish.name}
						</option>
					))}
				</SelectForm>
			</div>
			{idEdit === undefined ? (
				<div>
					<LabelForm>Rol de usuario</LabelForm>
					<SelectForm
						value={rol}
						onChange={e => {
							setPersonalInfo(personal => {
								return { ...personal, rol: e.target.value };
							});
						}}
					>
						<option value="seminarista">Seminarista</option>
						<option value="profesor">Profesor</option>
						<option value="formador">Formador</option>
					</SelectForm>
				</div>
			) : null}
		</div>
	);
};

import React, { useContext, useEffect, useState } from 'react';
import WorkerCSS from '../styles/WokerCSS.module.css';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { SocialMediaProps } from '../../form/interfaces/Form';
import { ButtonNextBackForm } from '../../form/components/small_components/ButtonNextBackForm';
import WorkerPersonalInfo from './WorkerPersonalInfo';
import {
	contactInfoInterface,
	dataGetWorker,
	personalInfoInterfaces,
} from '../interfaces/worker';
import WorkerContactInfo from './WorkerContactInfo';
import { SocialMediaForm } from '../../form/components/SocialMediaForm';
import { ProfilePictureForm } from '../../form/components/ProfilePictureForm';
import { AuthContext } from '../../login/context/AuthContext';
import { CreateWorker } from '../helpers/CreateWorker';
import { useNavigate, useParams } from 'react-router-dom';
import { GetWorkerEdit } from '../helpers/GetWorkerEdit';
import { EditWorker } from '../helpers/EditWorker';

type ProfilePicture = File | null;

export const WorkerRegister = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const [data, setData] = useState<dataGetWorker[] | null>(null);
	const [personalInfo, setPersonalInfo] = useState<personalInfoInterfaces>({
		forename: '',
		surename: '',
		id: '',
		birthDate: '',
		blood: 'A_POSITIVO',
		medicalRecord: '',
		position: 'MANTENIMIENTO',
	});
	const [contactInfo, setContactInfo] = useState<contactInfoInterface>({
		phoneNumber: '',
		descriptionNumber: '',
		phoneNumberFamily: '',
		descriptionNumberFamily: '',
		email: '',
	});
	const [socialMedia, setSocialMedia] = useState<SocialMediaProps[]>([]);
	const [profilePicture, setProfilePicture] = useState<ProfilePicture | null>(
		null
	);
	const [letterId, setLetterId] = useState('V-');
	const [number, setNumber] = useState(1);
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user?.token || !id) return;
		if (id !== '') {
			GetWorkerEdit({ id: id, token: user?.token })
				.then(response => {
					setData(response);
				})
				.catch(error => {
					console.log(error);
					alert('Error al traer los datos para editar');
				});
		}
	}, [id, user?.token]);
	useEffect(() => {
		if (data !== null) {
			data?.map(worker => {
				setPersonalInfo({
					forename: worker.person.forename,
					surename: worker.person.surname,
					id: worker.person.id.slice(2),
					birthDate: worker.person.date_String,
					blood: worker.person.BloodType,
					medicalRecord: worker?.person?.medical_record,
					position: worker.position,
				});
				setContactInfo({
					phoneNumber: worker.person?.cellpones[0]?.phone_number,
					descriptionNumber: worker.person?.cellpones[0]?.description,
					phoneNumberFamily:
						worker?.person?.cellpones[1]?.phone_number,
					descriptionNumberFamily:
						worker?.person?.cellpones[1]?.description,
					email: worker.person.email,
				});
				setSocialMedia(
					worker.person.medias.map(medias => ({
						category: medias.category,
						link: medias.link,
					}))
				);
				setLetterId(worker.person.id.slice(0, 2));
				const profilePictureURL =
					worker.person.profile_picture_path.includes('http')
						? worker.person.profile_picture_path
						: `https://${worker.person.profile_picture_path}`;
				fetch(profilePictureURL)
					.then(response => response.blob())
					.then(myBlob => {
						const myFile = new File([myBlob], 'image.jpeg', {
							type: myBlob.type,
						});
						setProfilePicture(myFile);
					})
					.catch(error => console.log(error));
			});
		}
	}, [data, id]);
	console.log(
		personalInfo.position.charAt(0).toUpperCase() +
			personalInfo.position.slice(1).toLowerCase()
	);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user?.token) return;
		if (!profilePicture) return;
		const dataSent = {
			persona: {
				id: letterId + personalInfo.id,
				forename: personalInfo.forename,
				surname: personalInfo.surename,
				email: contactInfo.email,
				birthdate: personalInfo.birthDate,
				medical_record: personalInfo.medicalRecord,
				BloodType: personalInfo.blood,
				phone: [
					{
						phone_number: contactInfo.phoneNumber,
						description: contactInfo.descriptionNumber,
					},
					{
						phone_number: contactInfo.phoneNumberFamily,
						description: contactInfo.descriptionNumberFamily,
					},
				],
				social: socialMedia.map(social => {
					return {
						social_media_category: social.category,
						link: social.link,
					};
				}),
			},
			job_position:
				personalInfo.position.charAt(0).toUpperCase() +
				personalInfo.position.slice(1).toLowerCase(),
		};
		console.log(dataSent);
		if (!id) {
			CreateWorker({
				data: dataSent,
				imageFile: profilePicture,
				token: user?.token,
			})
				.then(response => {
					if (response.ok) {
						alert('Trabajador creado correctamente');
						navigate('..');
					}
				})
				.catch(error => {
					console.log(error);
					alert('Error al crear trabajador');
				});
		} else {
			EditWorker({
				data: dataSent,
				imageFile: profilePicture,
				token: user.token,
			})
				.then(response => {
					if (response.ok) {
						alert('Trabajador actualizado correctamente');
						navigate('..');
					}
				})
				.catch(error => {
					console.log(error);
					alert('Error al crear trabajador');
				});
		}
	};
	const handleFirstForm = () => {
		if (!personalInfo.forename) {
			alert('Debe rellenar el campo de nombre');
			return false;
		}
		if (!personalInfo.surename) {
			alert('Debe rellenar el campo de apellido');
			return false;
		}

		if (!personalInfo.id) {
			alert('Debe rellenar la cédula');
			return false;
		}

		if (!personalInfo.birthDate) {
			alert('Debe rellenar la fecha de nacimiento');
			return false;
		}
		return true;
	};

	const handleSecondForm = () => {
		if (!contactInfo.phoneNumber) {
			alert('Debe especificar el número de teléfono');
			return false;
		}
		if (!contactInfo.descriptionNumber) {
			alert('Debe Indicar la descripción del teléfono');
			return false;
		}

		if (!contactInfo.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
			alert('Debe ingresar una dirección de correo válida');
			return false;
		}
		if (!contactInfo.phoneNumberFamily) {
			alert('Debe especificar el número de teléfono');
			return false;
		}
		if (!contactInfo.descriptionNumberFamily) {
			alert('Debe Indicar la descripción del teléfono');
			return false;
		}
		return true;
	};
	return (
		<ContentContainer>
			<form action="POST" onSubmit={handleSubmit}>
				{number === 1 ? (
					<>
						<WorkerPersonalInfo
							forename={personalInfo.forename}
							surename={personalInfo.surename}
							id={personalInfo.id}
							birthDate={personalInfo.birthDate}
							blood={personalInfo.blood}
							medicalRecord={personalInfo.medicalRecord}
							position={personalInfo.position}
							setPersonalInfo={setPersonalInfo}
							setLetterId={setLetterId}
							letterId={letterId}
						/>
						<ButtonNextBackForm
							initial
							setNumber={setNumber}
							handleNext={handleFirstForm}
						/>
					</>
				) : null}

				{number === 2 ? (
					<>
						<WorkerContactInfo
							phoneNumber={contactInfo.phoneNumber}
							descriptionNumber={contactInfo.descriptionNumber}
							phoneNumberFamily={contactInfo.phoneNumberFamily}
							descriptionNumberFamily={
								contactInfo.descriptionNumberFamily
							}
							email={contactInfo.email}
							setContactInfo={setContactInfo}
						/>
						<ButtonNextBackForm
							setNumber={setNumber}
							handleNext={handleSecondForm}
						/>
					</>
				) : null}
				{number === 3 ? (
					<>
						<SocialMediaForm
							setModal={setModal}
							modal={modal}
							socialMedia={socialMedia}
							setSocialMedia={setSocialMedia}
						/>
						<ButtonNextBackForm setNumber={setNumber} />
					</>
				) : null}
				{number === 4 ? (
					<>
						<ProfilePictureForm
							setProfilePicture={setProfilePicture}
							profilePicture={profilePicture}
							title="Subir foto"
							content="Selecciona tu foto y enviala"
						/>

						<button
							className={WorkerCSS.buttonSend}
							type="submit"
							disabled={!profilePicture}
						>
							Guardar
						</button>

						<ButtonNextBackForm final setNumber={setNumber} />
					</>
				) : null}
			</form>
		</ContentContainer>
	);
};

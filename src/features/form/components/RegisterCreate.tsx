import React, { useContext, useEffect, useState } from 'react';
import FormCSS from '../styles/FormCSS.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ContactInfoForm } from './ContactInfoForm';
import { AcademicCareer } from './AcademicCareer';
import { ProfessionalCareer } from './ProfessionalCareer';
import { ButtonNextBackForm } from '././small_components/ButtonNextBackForm';
import { SocialMediaForm } from './SocialMediaForm';
import {
	contactInfoProps,
	SocialMediaProps,
	seminarianInfo,
	professionalInfo,
} from '../interfaces/Form';
import { personalInfoProps } from '../interfaces/Form';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { ProfilePictureForm } from './ProfilePictureForm';
import { CreateSeminarian } from '../helpers/CreateSeminarian';
import { AuthContext } from '../../login/context/AuthContext';
import { CreateProfessor } from '../helpers/CreateProfessor';
import { useParams } from 'react-router-dom';
import { userEditProps } from '../interfaces/Form';
import { EditSeminarian } from '../helpers/EditSeminarian';
import { GetSeminarianEdit } from '../helpers/GetSeminarianEdit';
import { GetProfessorEdit, professor } from '../helpers/GetProfessorEdit';
import { EditProfessor } from '../helpers/EditProfessor';
type ProfilePicture = File | null;

const RegisterCreate = () => {
	const { user } = useContext(AuthContext);
	const [number, setNumber] = useState(1);
	const [modal, setModal] = useState(false);
	const [anotherSeminary, setAnotherSeminary] = useState<boolean>(false);
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	//const apiUrl = `http:	127.0.0.1:3000/seminarian/getsem?id=${id}`
	//const {data} = UseGet<userEditProps[]>(apiUrl)
	const [typeUserEdit, setTypeUserEdit] = useState<string | undefined>(
		undefined
	);
	const [data, setData] = useState<userEditProps[]>([]);
	const [dataProfessor, setDataProfessor] = useState<professor[]>([]);
	const [letterId, setLetterId] = useState<string>('V-');

	const [personalInfo, setPersonalInfo] = useState<personalInfoProps>({
		name: '',
		lastName: '',
		id: '',
		birthDate: '',
		bloodType: 'UNKNOWN',
		medicalRecord: '',
		rol: 'seminarista',
		diocese: '1',
		parish: '',
	});

	const [contactInfo, setContactInfo] = useState<contactInfoProps>({
		phone: '',
		phoneFamily: '',
		description: '',
		descriptionFamily: '',
		email: '',
	});
	const [socialMedia, setSocialMedia] = useState<SocialMediaProps[]>([]);
	const [seminarianInfo, setSeminarianInfo] = useState<seminarianInfo>({
		academicTraining: '',
		stage: '',
		linkTitle: '',
		apostolates: '',
		ministriesReceived: 'UNKOWN',
		condition: 'INTERNO',
		status: '',
		nameSeminaryExternal: '',
		yearOfIncome: 1,
	});

	const [professionalInfo, setProfessionalInfo] = useState<professionalInfo>({
		academicTraining: '',
		linkTitle: '',
		startingDate: '',
		instructorPosition: 'RECTOR',
	});
	const [profilePicture, setProfilePicture] = useState<ProfilePicture>(null);

	const rol = personalInfo.rol;

	console.log(seminarianInfo.stage);

	useEffect(() => {
		if (location.pathname.includes('seminarian')) {
			setTypeUserEdit('seminarista');
			return;
		}
		if (location.pathname.includes('professor')) {
			setTypeUserEdit('profesor');
			return;
		}
	}, [location.pathname]);

	useEffect(() => {
		if (!id) return;
		if (!user?.token) return;

		if (typeUserEdit === 'seminarista') {
			GetSeminarianEdit(id, user?.token)
				.then(response => {
					if (response) return setData(response);
				})
				.catch(error => {
					alert(
						'Error al traer la informacion del seminarista para editar'
					);
					console.log(error);
					return;
				});
		}
		if (typeUserEdit === 'profesor') {
			GetProfessorEdit(id, user?.token)
				.then(response => {
					return setDataProfessor(response);
				})
				.catch(error => {
					alert(
						'Error al traer la informacion del profesor para editar'
					);
					console.log(error);
					return;
				});
		}
	}, [id, typeUserEdit, user?.token]);

	useEffect(() => {
		if (id === undefined) return;
		if (!data) return;

		if (typeUserEdit === 'seminarista') {
			data.map(infoUserEdit => {
				setPersonalInfo({
					id: infoUserEdit.id.slice(2),
					name: infoUserEdit.person.forename,
					lastName: infoUserEdit.person.surname,
					birthDate: infoUserEdit.person.date_String,
					bloodType: infoUserEdit.person.BloodType,
					medicalRecord: infoUserEdit.person.medical_record,
					rol: 'seminarista',
					diocese: infoUserEdit.diocesi_id.toString(),
					parish: infoUserEdit.parish_id.toString(),
				});
				setContactInfo({
					phone: infoUserEdit.person?.cellpones[0]?.phone_number,
					description: infoUserEdit.person?.cellpones[0]?.description,
					phoneFamily:
						infoUserEdit.person?.cellpones[1]?.phone_number,
					descriptionFamily:
						infoUserEdit.person?.cellpones[1]?.description,
					email: infoUserEdit.person.email,
				});
				setSocialMedia(
					infoUserEdit.person?.medias?.map(user => ({
						category: user.social_media_category,
						link: user.link,
					}))
				);
				setSeminarianInfo({
					academicTraining: infoUserEdit.degrees?.[0]?.description,
					stage:
						infoUserEdit.stage === '1'
							? 'PROPEDEUTICO'
							: infoUserEdit.stage === '2'
							? 'DISCIPULADO'
							: 'CONFIGURATIVA',
					linkTitle: infoUserEdit.degrees?.[0]?.link,
					apostolates: infoUserEdit.apostleships,
					ministriesReceived: infoUserEdit.Ministery,
					condition: infoUserEdit.location,
					status: infoUserEdit.status,
					nameSeminaryExternal:
						infoUserEdit.foreing_Data?.seminary_name,
					yearOfIncome: infoUserEdit.foreing_Data?.stage_year,
				});

				const pictureLink =
					infoUserEdit.person.profile_picture_path.includes('http')
						? infoUserEdit.person.profile_picture_path
						: `https://${infoUserEdit.person.profile_picture_path}`;

				fetch(pictureLink)
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
		if (typeUserEdit === 'profesor') {
			dataProfessor.map(infoProfessorEdit => {
				setPersonalInfo({
					id: infoProfessorEdit.person.id.slice(2),
					name: infoProfessorEdit.person.forename,
					lastName: infoProfessorEdit.person.surname,
					birthDate: infoProfessorEdit.person.date_String,
					bloodType: infoProfessorEdit.person.BloodType,
					medicalRecord: infoProfessorEdit.person.medical_record,
					rol:
						infoProfessorEdit.instructor.is_instructor === false
							? 'profesor'
							: 'formador',
					parish: infoProfessorEdit.parish.id.toString(),
					diocese: infoProfessorEdit.parish.diocese_id.toString(),
				});
				setContactInfo({
					phone: infoProfessorEdit?.phone_number[0]?.phone_number,
					description:
						infoProfessorEdit?.phone_number[0]?.description,
					phoneFamily:
						infoProfessorEdit?.phone_number[1]?.phone_number,
					descriptionFamily:
						infoProfessorEdit?.phone_number[1]?.description,
					email: infoProfessorEdit.person.email,
				});
				setSocialMedia(
					infoProfessorEdit.social.map(user => ({
						category: user.social_media_category,
						link: user.link,
					}))
				);
				setProfessionalInfo({
					academicTraining:
						infoProfessorEdit.degrees?.[0].description,
					linkTitle: infoProfessorEdit.degrees?.[0].link,
					startingDate:
						infoProfessorEdit.instructor.starting_date_string,
					instructorPosition:
						infoProfessorEdit.instructor.instructor_position,
				});
				console.log(infoProfessorEdit.person.profile_picture_path);

				const pictureLink =
					infoProfessorEdit.person.profile_picture_path.includes(
						'http'
					)
						? infoProfessorEdit.person.profile_picture_path
						: `https://${infoProfessorEdit.person.profile_picture_path}`;

				fetch(pictureLink)
					.then(response => response.blob())
					.then(myBlob => {
						const myFile = new File([myBlob], 'image.jpeg', {
							type: myBlob.type,
						});
						setProfilePicture(myFile);
					})
					.catch(error => console.log(error));
				console.log(dataProfessor);
			});
		}
	}, [data, id, user?.token, dataProfessor, typeUserEdit]);

	console.log({ socialMedia });
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const dataSent = {
			persona: {
				id: letterId + personalInfo.id,
				forename: personalInfo.name,
				surname: personalInfo.lastName,
				email: contactInfo.email,
				birthdate: personalInfo.birthDate,
				medical_record: personalInfo.medicalRecord,
				BloodType: personalInfo.bloodType,
				phone: [
					{
						phone_number: contactInfo.phone,
						description: contactInfo.description,
					},
					{
						phone_number: contactInfo.phoneFamily,
						description: contactInfo.descriptionFamily,
					},
				],

				social: socialMedia.map(social => {
					return {
						social_media_category: social.category,
						link: social.link,
					};
				}),
			},
			user: {},
			ForeingSeminarian: anotherSeminary ? {} : undefined,
			location: personalInfo.rol === 'seminarista' ? '' : undefined,
			apostleships: personalInfo.rol === 'seminarista' ? '' : undefined,
			ministery: seminarianInfo.stage === '3' ? '' : undefined,
			instructor: personalInfo.rol === 'formador' ? {} : undefined,
			status: personalInfo.rol === 'seminarista' && id ? '' : undefined,
			stage: seminarianInfo.stage,
		};

		if (personalInfo.rol === 'seminarista') {
			const dataExtra = {
				user: {
					degree: [
						{
							description: seminarianInfo.academicTraining,
							link: seminarianInfo.linkTitle,
						},
					],
					parish_id: 1,
				},
				ForeingSeminarian: anotherSeminary
					? {
							stage: seminarianInfo.stage,
							seminary_name: seminarianInfo.nameSeminaryExternal,
							stage_year: seminarianInfo.yearOfIncome,
					  }
					: undefined,
				stage: seminarianInfo.stage,
				location: seminarianInfo.condition,
				apostleships: seminarianInfo.apostolates,
				ministery: seminarianInfo.ministriesReceived,
				status: seminarianInfo.status,
			};
			dataSent.user = dataExtra.user;
			dataSent.ForeingSeminarian = dataExtra.ForeingSeminarian;
			dataSent.location = dataExtra.location;
			dataSent.apostleships = dataExtra.apostleships;
			dataSent.ministery = dataExtra.ministery;
			dataSent.status = dataExtra.status;
			dataSent.stage = dataExtra.stage;

			if (!anotherSeminary) {
				delete dataSent.ForeingSeminarian;
			}
			delete dataSent.instructor;

			if (!profilePicture) return;
			const imageFile = profilePicture;
			if (!user) return;

			if (!id) {
				console.log(dataSent);
				CreateSeminarian({
					data: dataSent,
					imageFile: imageFile,
					token: user?.token,
				})
					.then(response => {
						if (response.ok) {
							alert('Seminarista Creado');
							setTimeout(() => {
								navigate('../');
							}, 1000);
						} else {
							throw new Error();
						}
					})
					.catch(error => {
						alert('Error al Crear Seminarista');
						console.log(error);
					});
			} else {
				console.log(dataSent.status);
				EditSeminarian({
					data: dataSent,
					imageFile: imageFile,
					token: user?.token,
				})
					.then(response => {
						if (response.ok) {
							alert('Seminarista actualizado');
							navigate('../');
						} else {
							throw new Error();
						}
					})
					.catch(error => {
						alert('Error al actualizar Seminarista');
						console.log(error);
					});
			}
		} else {
			console.log('mi rol es' + personalInfo.rol);
			const dataExtra = {
				user: {
					parish_id: 1,
					degree: [
						{
							description: professionalInfo.academicTraining,
							link: professionalInfo.linkTitle,
						},
					],
				},
				instructor:
					personalInfo.rol === 'formador'
						? {
								is_instructor: true,
								starting_date: professionalInfo.startingDate,
								instructor_position:
									professionalInfo.instructorPosition,
						  }
						: {
								is_instructor: false,
						  },
			};
			dataSent.user = dataExtra.user;
			dataSent.instructor = dataExtra.instructor;

			delete dataSent.ForeingSeminarian;
			delete dataSent.location;
			delete dataSent.apostleships;
			delete dataSent.ministery;
			delete dataSent.status;

			if (!profilePicture) return;
			const imageFile = profilePicture;
			if (!user) return;
			if (!id) {
				CreateProfessor({
					data: dataSent,
					imageFile: imageFile,
					token: user.token,
				})
					.then(response => {
						if (response.ok) {
							alert('Usuario creado correctamente');

							navigate('../');
							console.log(data);
							return;
						} else {
							throw new Error();
						}
					})
					.catch(error => {
						alert('Hubo un problema al crear usuario');
						console.log(error);
						return;
					});
			} else {
				EditProfessor({
					data: dataSent,
					imageFile: imageFile,
					token: user.token,
				})
					.then(response => {
						if (response.ok) {
							alert('Usuario actualizado correctamente');

							navigate('../');
						} else {
							throw new Error();
						}
					})
					.catch(error => {
						alert('Hubo un problema al actualizar usuario');
						console.log(error);
					});
			}
		}
	};

	const handleFirstForm = () => {
		if (!personalInfo.name) {
			alert('Debe rellenar el campo de nombre');
			return false;
		}
		if (!personalInfo.lastName) {
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
		if (!contactInfo.phone) {
			alert('Debe especificar el número de teléfono');
			return false;
		}
		if (!contactInfo.description) {
			alert('Debe Indicar la descripción del teléfono');
			return false;
		}

		if (!contactInfo.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
			alert('Debe ingresar una dirección de correo válida');
			return false;
		}
		if (!contactInfo.phoneFamily) {
			alert('Debe ingresar el número de telefono familiar');
			return false;
		}
		if (!contactInfo.descriptionFamily) {
			alert('Debe ingresar la descripción del teléfono familiar');
			return false;
		}
		return true;
	};

	console.log(profilePicture);
	const handleThirdForm = () => {
		if (rol === 'seminarista') {
			if (anotherSeminary && !seminarianInfo.nameSeminaryExternal) {
				alert(
					'Debe ingresar un nombre de Seminario donde proviene válido'
				);
				return false;
			}

			return true;
		}

		if (rol == 'formador') {
			if (!professionalInfo.startingDate) {
				alert('Ingrese la fecha de ordenación');
				return false;
			}
			return true;
		}
		return true;
	};
	return (
		<ContentContainer>
			<form action="POST" onSubmit={handleSubmit}>
				{number === 1 ? (
					<>
						<PersonalInfoForm
							name={personalInfo.name}
							lastName={personalInfo.lastName}
							id={personalInfo.id}
							idEdit={id}
							setLetterId={setLetterId}
							letterId={letterId}
							birthDate={personalInfo.birthDate}
							bloodType={personalInfo.bloodType}
							medicalRecord={personalInfo.medicalRecord}
							rol={personalInfo.rol}
							setPersonalInfo={setPersonalInfo}
							diocese={personalInfo.diocese}
							parish={personalInfo.parish}
						/>
						<ButtonNextBackForm
							initial
							setNumber={setNumber}
							handleNext={handleFirstForm}
						/>
					</>
				) : number === 2 ? (
					<>
						<ContactInfoForm
							contactInfo={contactInfo}
							setContactInfo={setContactInfo}
						/>
						<ButtonNextBackForm
							setNumber={setNumber}
							handleNext={handleSecondForm}
						/>
					</>
				) : number === 3 ? (
					<>
						<SocialMediaForm
							setModal={setModal}
							modal={modal}
							socialMedia={socialMedia}
							setSocialMedia={setSocialMedia}
						/>
						<ButtonNextBackForm setNumber={setNumber} />
					</>
				) : number === 4 ? (
					<>
						{rol === 'seminarista' ? (
							<AcademicCareer
								academicTraining={
									seminarianInfo.academicTraining
								}
								stage={seminarianInfo.stage}
								linkTitle={seminarianInfo.linkTitle}
								apostolates={seminarianInfo.apostolates}
								ministriesReceived={
									seminarianInfo.ministriesReceived
								}
								condition={seminarianInfo.condition}
								status={seminarianInfo.status}
								nameSeminaryExternal={
									seminarianInfo.nameSeminaryExternal
								}
								id={id}
								setAnotherSeminary={setAnotherSeminary}
								anotherSeminary={anotherSeminary}
								yearOfIncome={seminarianInfo.yearOfIncome}
								setSeminarianInfo={setSeminarianInfo}
							/>
						) : (
							<ProfessionalCareer
								academicTraining={
									professionalInfo.academicTraining
								}
								linkTitle={professionalInfo.linkTitle}
								startingDate={professionalInfo.startingDate}
								rol={personalInfo.rol}
								setProfessionalInfo={setProfessionalInfo}
								instructorPosition={
									professionalInfo.instructorPosition
								}
							/>
						)}
						<ButtonNextBackForm
							setNumber={setNumber}
							handleNext={handleThirdForm}
						/>
					</>
				) : number === 5 ? (
					<>
						<ProfilePictureForm
							setProfilePicture={setProfilePicture}
							profilePicture={profilePicture}
							title="foto"
							content="Subir foto"
						/>
						<div className={FormCSS.buttonContainer}>
							<button
								type="submit"
								className={FormCSS.buttonSaveForm}
								disabled={!profilePicture}
							>
								Guardar
							</button>
						</div>
						<ButtonNextBackForm final setNumber={setNumber} />
					</>
				) : null}
			</form>
		</ContentContainer>
	);
};

export default RegisterCreate;

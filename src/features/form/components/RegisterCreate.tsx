import React, {useContext, useState } from 'react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ContactInfoForm } from './ContactInfoForm';
import { AcademicCareer } from './AcademicCareer';
import { ProfessionalCareer } from './ProfessionalCareer';
import { ButtonNextBackForm } from '././small_components/ButtonNextBackForm';
import { SocialMediaForm } from './SocialMediaForm';
import {contactInfoProps,SocialMediaProps,seminarianInfo,professionalInfo} from '../interfaces/Form';
import { personalInfoProps } from '../interfaces/Form';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { ProfilePictureForm } from './ProfilePictureForm';
import { CreateSeminarian } from '../helpers/CreateSeminarian';
import { AuthContext } from '../../login/context/AuthContext';
import { CreateProfessor } from '../helpers/CreateProfessor';

type ProfilePicture = FileList | null;


const RegisterCreate = () => {
	const {user} =useContext(AuthContext)
	const [number, setNumber] = useState(1);
	const [modal, setModal] = useState(false);
    const [anotherSeminary, setAnotherSeminary]=useState(false)

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
		description:'',
		descriptionFamily: '',
		email: '',
	});
	const [socialMedia, setSocialMedia] = useState<SocialMediaProps[]>([]);
	const [seminarianInfo, setSeminarianInfo] = useState<seminarianInfo>({
		academicTraining: '',
		stage: '',
		linkTitle: '',
		apostolates: '',
		ministriesReceived: 'Unkown',
		condition: 'Interno',
		status: '',
		nameSeminaryExternal: '',
		yearOfIncome: '',
	});

	const [professionalInfo, setProfessionalInfo] = useState<professionalInfo>({
		academicTraining: '',
		linkTitle: '',
		startingDate: '',
	});
	const [profilePicture, setProfilePicture]= useState<ProfilePicture>(null);

    let rol = personalInfo.rol;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		if(personalInfo.rol === 'seminarista'){
		const dataSent= {
			persona:{
				id:personalInfo.id,
				forename:personalInfo.name,
				surname:personalInfo.lastName,
				email:contactInfo.email,
				birthdate:personalInfo.birthDate,
				medical_record:personalInfo.medicalRecord,
				BloodType:personalInfo.bloodType,
				
				phone:[{
					phone_numbre:contactInfo.phone,
					description:'hola',
				},
				{
					phone_numbre:contactInfo.phone,
					description:contactInfo.descriptionFamily,
				},
				],

				social: socialMedia.map((social)=>{
					return {
						social_media_category:social.category,
						link:social.link
					}
				}),
			},
				user:{
					parish_id:1
				},

				ForeingSeminarian:anotherSeminary ?{
					seminary_name:seminarianInfo.nameSeminaryExternal,
					stage:seminarianInfo.stage,
					stage_year:seminarianInfo.yearOfIncome
				} : null
				,
				location:seminarianInfo.condition,
				apostleships:seminarianInfo.apostolates,
				ministery:seminarianInfo.ministriesReceived
			}

			if(!anotherSeminary){
				delete dataSent.ForeingSeminarian
			}

			
			if(!profilePicture) return
			const imageFile = profilePicture[0];
			if(!user) return

			CreateSeminarian({data:dataSent,imageFile:imageFile,token:user?.token}).catch((error) => {
				alert('Error al Crear Seminarista');
				console.log(error)
			});

		}else{
			const dataSent= {
				persona:{
					id:"V-"+personalInfo.id,
					forename:personalInfo.name,
					surname:personalInfo.lastName,
					email:contactInfo.email,
					birthdate:personalInfo.birthDate,
					medical_record:personalInfo.medicalRecord,
					BloodType:personalInfo.bloodType,
					
					phone:[{
						phone_number:contactInfo.phone,
						description:contactInfo.description,
					},
					{
						phone_number:contactInfo.phone,
						description:contactInfo.descriptionFamily,
					},
					],
	
					social: socialMedia.map((social)=>{
						return {
							social_media_category:social.category,
							link:social.link
						}
					}),
				},
					user:{
						parish_id:1,
						degree:[{
							description: professionalInfo.academicTraining,
    						link: professionalInfo.linkTitle
						}]
					},
					instructor:personalInfo.rol === 'formador'?{
						is_instructor: true,
						starting_date:'2024-06-11T00:00:00.000Z',
						instructor_position:'RECTOR'
					}:{
						is_instructor:false,
						starting_date:null,
						instructor_position:null
					}
				}
				if(!profilePicture) return
				const imageFile = profilePicture[0];
				if(!user) return


				CreateProfessor({data:dataSent,imageFile:imageFile,token:user.token}).then((response)=>{
					if(response.ok){
						alert("Usuario creado correctamente")
					}
				}).catch((error)=>{
					alert('Hubo un problema al crear usuario')
					console.log(error)
				})
		}
	}
	return (
		<ContentContainer>
			<form action="POST" onSubmit={handleSubmit}>
				{number === 1 ? (
					<>
						<PersonalInfoForm
							name={personalInfo.name}
							lastName={personalInfo.lastName}
							id={personalInfo.id}
							birthDate={personalInfo.birthDate}
							bloodType={personalInfo.bloodType}
							medicalRecord={personalInfo.medicalRecord}
							rol={personalInfo.rol}
							setPersonalInfo={setPersonalInfo}
							diocese={personalInfo.diocese}
							parish={personalInfo.parish}
						/>
						<ButtonNextBackForm initial setNumber={setNumber} />
					</>
				) : number === 2 ? (
					<>
						<ContactInfoForm
							contactInfo={contactInfo}
							setContactInfo={setContactInfo}
						/>
						<ButtonNextBackForm setNumber={setNumber} />
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
							/>
						)}
						<ButtonNextBackForm setNumber={setNumber} />
					</>
				) : number === 5 ? (
					<>
						<ProfilePictureForm 
						setProfilePicture={setProfilePicture}
						profilePicture={profilePicture}
						title='foto'
						content='Subir foto'/>
						<ButtonNextBackForm final setNumber={setNumber}/>
						<button type='submit'>SEND</button>
					</>
					
				):null}
			</form>
		</ContentContainer>
	);
};

export default RegisterCreate;

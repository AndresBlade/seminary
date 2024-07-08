import { useState } from 'react';
import { ContainerForm } from '././small_components/ContainerForm';
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
const RegisterCreate = () => {
	const [number, setNumber] = useState(1);
	const [modal, setModal] = useState(false);
	const rol = 'seminarista';

	const [personalInfo, setPersonalInfo] = useState<personalInfoProps>({
		name: '',
		lastName: '',
		id: '',
		birthDate: '',
		bloodType: '',
		medicalRecord: '',
		rol: '',
	});

	const [contactInfo, setContactInfo] = useState<contactInfoProps>({
		phone: '',
		phoneFamily: '',
		descriptionFamily: '',
		email: '',
	});
	const [socialMedia, setSocialMedia] = useState<SocialMediaProps[]>([]);
	const [seminarianInfo, setSeminarianInfo] = useState<seminarianInfo>({
		academicTraining: '',
		stage: '',
		linkTitle: '',
		diocese: '',
		parish: '',
		apostolates: '',
		ministriesReceived: '',
		condition: '',
		status: '',
		nameSeminaryExternal: '',
		yearOfIncome: '',
	});

	const [professionalInfo, setProfessionalInfo] = useState<professionalInfo>({
		academicTraining: '',
		linkTitle: '',
		ordinationDate: '',
		ministryYears: '',
	});
	return (
		<ContentContainer>
			<form action="POST">
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
								diocese={seminarianInfo.diocese}
								parish={seminarianInfo.parish}
								apostolates={seminarianInfo.apostolates}
								ministriesReceived={
									seminarianInfo.ministriesReceived
								}
								condition={seminarianInfo.condition}
								status={seminarianInfo.status}
								nameSeminaryExternal={
									seminarianInfo.nameSeminaryExternal
								}
								yearOfIncome={seminarianInfo.yearOfIncome}
								setSeminarianInfo={setSeminarianInfo}
							/>
						) : (
							<ProfessionalCareer
								academicTraining={
									professionalInfo.academicTraining
								}
								linkTitle={professionalInfo.linkTitle}
								ordinationDate={professionalInfo.ordinationDate}
								ministryYears={professionalInfo.ministryYears}
								setProfessionalInfo={setProfessionalInfo}
							/>
						)}
						<ButtonNextBackForm setNumber={setNumber} />
					</>
				) : null}
			</form>
		</ContentContainer>
	);
};

export default RegisterCreate;

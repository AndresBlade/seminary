import { useState } from 'react';
import Worker from '../styles/worker.module.css';
import WorkerFormLabor from './WorkerFormLabor';
import WokerFormPersonal from './WorkerFormPersonal';
import WorkerFormContact from './WorkerFormContact';
import WorkerFormSocialMedia from './WorkerFormSocialMedia';
import { ProfilePictureForm } from './ProfilePictureForm';
import WorkerFormButtons from './WorkerFormButtons';
import ContentTitle from '../../ui/contentTitles/components/ContentTitle';
import { CreateWorker } from '../helpers/CreateWorker';
export interface SocialMedia {
	category: number;
	link: string;
}
export interface WorkerPersonalInfo {
	name: string;
	lastName: string;
	id: string;
	birthDate: string;
}
export interface WorkerContactInfo {
	phone: string;
	description: string;
	phoneFamily: string;
	descriptionFamily: string;
	email: string;
}
export interface WorkerJobAndMedical {
	jobPosition: string;
	blood: string;
	condition: string;
}

type WorkerProfilePicture = FileList | null;

const WorkerCreate = () => {
	const [number, setNumber] = useState<number>(1);
	const [modal, setModal] = useState<boolean>(false);

	const [workerPersonalInfo, setWorkerPersonal] =
		useState<WorkerPersonalInfo>({
			name: '',
			lastName: '',
			id: '',
			birthDate: '',
		});
	const [workerPhone, setWorkerPhone] = useState<WorkerContactInfo>({
		phone: '',
		description: '',
		phoneFamily: '',
		descriptionFamily: '',
		email: '',
	});
	const [workerSocialMedia, setWorkerSocialMedia] = useState<SocialMedia[]>(
		[]
	);
	const [workerProfilePicture, setWorkerProfilePicture] =
		useState<WorkerProfilePicture>(null);
	const [workerJobPositionAndMedical, setWorkerJobPositionAndMedical] =
		useState<WorkerJobAndMedical>({
			blood: '',
			condition: '',
			jobPosition: '',
		});
	const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const dataSent = {
			persona:{
				id:"V-" + workerPersonalInfo.id,
				forename:workerPersonalInfo.name,
				surname:workerPersonalInfo.lastName,
				email:workerPhone.email,
				birthdate:workerPersonalInfo.birthDate,
				medical_record:workerJobPositionAndMedical.condition,
				BloodType:workerJobPositionAndMedical.blood
			},
			telefono:[{
				phone_numbre:workerPhone.phone,
				description:workerPhone.description,
			},
			{
				phone_numbre:workerPhone.phoneFamily,
				description:workerPhone.descriptionFamily,
			}],
			social:
				workerSocialMedia.map((social)=>{
					return{
						social_media_category:social.category,
						link:social.link
					}
				}),
			job_position:workerJobPositionAndMedical.jobPosition
		}
		if(!workerProfilePicture) return
	
		const imageFile = workerProfilePicture[0];
		
		CreateWorker({data:dataSent,imageFile:imageFile}).catch((error) => {
			console.log(error);
		});
		console.log(dataSent)
	}
	return (
		<div className={Worker['worker-create__container']}>
			<div
				className={
					modal
						? Worker['worker-create__background--modal']
						: Worker['worker-create__background--hidden']
				}
			></div>
			<ContentTitle title="Trabajador" subtitle="Agregar Trabajador" />
			<form action='POST' onSubmit={handleSubmit} className={Worker['worker-create__form']}>
				<div className={Worker['worker-form__wrapper']}>
					{number === 1 ? (
						<>
							<WokerFormPersonal
								name={workerPersonalInfo.name}
								lastName={workerPersonalInfo.lastName}
								id={workerPersonalInfo.id}
								birthDate={workerPersonalInfo.birthDate}
								setWorkerPersonal={setWorkerPersonal}
							/>
							<WorkerFormButtons initial setNumber={setNumber} />
						</>
					) : number === 2 ? (
						<>
							<WorkerFormLabor
								jobPosition={
									workerJobPositionAndMedical.jobPosition
								}
								blood={workerJobPositionAndMedical.blood}
								condition={workerJobPositionAndMedical.condition}
								setWorkerJobPositionAndMedical={
									setWorkerJobPositionAndMedical
								}
							/>
							<WorkerFormButtons setNumber={setNumber} />
						</>
					) : number === 3 ? (
						<>
							<WorkerFormContact
								workerPhone={workerPhone}
								setWorkerPhone={setWorkerPhone}
							/>
							<WorkerFormButtons setNumber={setNumber} />
						</>
					) : number === 4 ? (
						<>
							<WorkerFormSocialMedia
								setModal={setModal}
								modal={modal}
								workerSocialMedia={workerSocialMedia}
								setWorkerSocialMedia={setWorkerSocialMedia}
							/>
							<WorkerFormButtons setNumber={setNumber} />
						</>
					) : number === 5 ? (
						<>
							<ProfilePictureForm
								setProfilePicture={setWorkerProfilePicture}
								title="Foto del trabajador"
								profilePicture={workerProfilePicture}
								content="Subir foto del trabajador"
							/>
							<WorkerFormButtons final setNumber={setNumber} />
							<button type='submit' className={Worker['button-send']}>Enviar</button>
						</>
					) : null}
				</div>
			</form>
		</div>
	);
};

export default WorkerCreate;

import { useState } from 'react';
import Worker from '../styles/worker.module.css';
import WorkerFormLabor from './WorkerFormLabor';
import WokerFormPersonal from './WorkerFormPersonal';
import WorkerFormContact from './WorkerFormContact';
import WorkerFormSocialMedia from './WorkerFormSocialMedia';
import { ProfilePictureForm } from './ProfilePictureForm';
import WorkerFormButtons from './WorkerFormButtons';
import ContentTitle from '../../ui/contentTitles/components/ContentTitle';

export interface SocialMedia {
	category?: number;
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
	console.log(workerPhone);
	console.log(workerSocialMedia.length);
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
			<form className={Worker['worker-create__form']}>
				{number === 1 ? (
					<div className={Worker['worker-create__personal']}>
						<WokerFormPersonal
							name={workerPersonalInfo.name}
							lastName={workerPersonalInfo.lastName}
							id={workerPersonalInfo.id}
							birthDate={workerPersonalInfo.birthDate}
							setWorkerPersonal={setWorkerPersonal}
						/>
						<WorkerFormButtons initial setNumber={setNumber} />
					</div>
				) : number === 2 ? (
					<div>
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
					</div>
				) : number === 3 ? (
					<div>
						<WorkerFormContact
							workerPhone={workerPhone}
							setWorkerPhone={setWorkerPhone}
						/>
						<WorkerFormButtons setNumber={setNumber} />
					</div>
				) : number === 4 ? (
					<div
						className={Worker['worker-create__form--inputs-media']}
					>
						<WorkerFormSocialMedia
							setModal={setModal}
							modal={modal}
							workerSocialMedia={workerSocialMedia}
							setWorkerSocialMedia={setWorkerSocialMedia}
						/>
						<WorkerFormButtons setNumber={setNumber} />
					</div>
				) : number === 5 ? (
					<div>
						<ProfilePictureForm
							setProfilePicture={setWorkerProfilePicture}
							title="Foto del trabajador"
							profilePicture={workerProfilePicture}
							content="Subir foto del trabajador"
						/>
						<WorkerFormButtons final setNumber={setNumber} />
					</div>
				) : null}
			</form>
		</div>
	);
};

export default WorkerCreate;

import React, { useContext, useState } from 'react'
import WorkerCSS from '../styles/WokerCSS.module.css'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import { SocialMediaProps } from '../../form/interfaces/Form'
import { ButtonNextBackForm } from '../../form/components/small_components/ButtonNextBackForm';
import WorkerPersonalInfo from './WorkerPersonalInfo';
import { contactInfoInterface, personalInfoInterfaces } from '../interfaces/worker';
import WorkerContactInfo from './WorkerContactInfo';
import { SocialMediaForm } from '../../form/components/SocialMediaForm';
import { ProfilePictureForm } from '../../form/components/ProfilePictureForm';
import { AuthContext } from '../../login/context/AuthContext';
import { CreateWorker } from '../helpers/CreateWorker';

type ProfilePicture = File | null;

export const WorkerRegister = () => {
    const {user}=useContext(AuthContext)
    const [personalInfo, setPersonalInfo]=useState<personalInfoInterfaces>({
        forename:'',
        surename:'',
        id:'',
        birthDate:'',
        blood:'A_POSITIVO',
        medicalRecord:'',
        position:'Mantenimiento'
    })
    const [contactInfo,setContactInfo]=useState<contactInfoInterface>({
        phoneNumber:'',
        descriptionNumber:'',
        phoneNumberFamily:'',
        descriptionNumberFamily:'',
        email:''
    })
	const [socialMedia, setSocialMedia] = useState<SocialMediaProps[]>([]);
	const [profilePicture, setProfilePicture] = useState<ProfilePicture | null>(null);
    const [letterId, setLetterId]=useState('V-');
    const [number, setNumber]=useState(1)
    const [modal, setModal]=useState(false)


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!user?.token)return
        if(!profilePicture) return
        const dataSent = {
            persona:{
                id:letterId+personalInfo.id,
                forename:personalInfo.forename,
                surname:personalInfo.surename,
                email:contactInfo.email,
                birthdate:'2001-01-01',
                medical_record:personalInfo.medicalRecord,
                BloodType:personalInfo.blood,
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
				})
            },
            job_position:personalInfo.position
        }
        console.log(dataSent)
        CreateWorker({data:dataSent,imageFile:profilePicture,token:user?.token}).catch(error=>{
            console.log(error)
            alert('Error al crear trabajador')
        })
    }

    return (
        <ContentContainer>
            <form action="POST" onSubmit={handleSubmit}>
                {number === 1 ?
                    <>
                    <WorkerPersonalInfo
                        forename={personalInfo.forename}
                        surename={personalInfo.surename}
                        id={personalInfo.id}
                        birthdate={personalInfo.birthDate}
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
                    />
                </>:null
                }
                
                {number === 2?
                    <>
                        <WorkerContactInfo
                            phoneNumber={contactInfo.phoneNumber}
                            descriptionNumber={contactInfo.descriptionNumber}
                            phoneNumberFamily={contactInfo.phoneNumberFamily}
                            descriptionNumberFamily={contactInfo.descriptionNumberFamily}
                            email={contactInfo.email}
                            setContactInfo={setContactInfo}
                        />
                    <ButtonNextBackForm
                        setNumber={setNumber}
                    />
                </>:null
                }
                {number === 3 ?
                    <>
                        <SocialMediaForm
                            setModal={setModal}
                            modal={modal}
                            socialMedia={socialMedia}
                            setSocialMedia={setSocialMedia}
                        />
                        <ButtonNextBackForm
                            setNumber={setNumber}
                        />
                    </>
                :null
                }
                {number === 4 ?
                    <>
                        <ProfilePictureForm
                            setProfilePicture={setProfilePicture}
                            profilePicture={profilePicture}
                            title='Subir foto'
                            content='Selecciona tu foto y enviala'
                        />
                        
                        <button 
                        className={WorkerCSS.buttonSend}
                        type='submit'>Guardar</button>

                        <ButtonNextBackForm
                            final
                            setNumber={setNumber}
                        />
                    </>
                :null
                }
            </form>
        </ContentContainer>
    )
}


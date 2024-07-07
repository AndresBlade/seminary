import { useState } from 'react'
import { ContainerForm } from '././small_components/ContainerForm'
import { PersonalInfoForm } from './PersonalInfoForm'
import { ContactInfoForm } from './ContactInfoForm'
import { AcademicCareer } from './AcademicCareer'
import { ButtonNextBackForm } from '././small_components/ButtonNextBackForm'
import { SocialMediaForm } from './SocialMediaForm'
import {SocialMediaProps} from '../interfaces/Form'
const RegisterCreate = () => {
    const [number, setNumber]=useState(1);
    const [modal, setModal]=useState(false);

    const [personalInfo,setPersonalInfo]= useState<>({
        name: '',
        lastName: '',
        id: '',
        birthDate: '',
        bloodType:'',
        medicalRecord:'',
        rol:''
    })

    const [contactInfo,setContactInfo]=useState<>({
        phone: '',
		description: '',
		phoneFamily: '',
		descriptionFamily: '',
		email: '',
    })
    const [socialMedia, setSocialMedia] = useState<SocialMediaProps[]>([])
    const [seminarianInfo] = useState<>({
        academicTraining: '',
        stage:'',
        diocese:'',
        parish: '',
        apostolates:'',
        ministriesReceived:'',
        condition:'',
        status:'',
        
    })

    return (
        <ContainerForm>
            
            <form action="POST">
                <div>
                    {
                    number === 1 ? (
                        <>
                            <PersonalInfoForm
                            />
                            <ButtonNextBackForm initial setNumber={setNumber}/>
                        </>
                    ) : number === 2 ? (
                        <>
                            <ContactInfoForm/>
                            <ButtonNextBackForm setNumber={setNumber}/>
                        </>
                    ) : number === 3 ? (
                        <>
                            <SocialMediaForm
                                setModal={setModal}
                                modal={modal}
                                socialMedia={socialMedia}
                                setSocialMedia={setSocialMedia}
                            />
                            <ButtonNextBackForm setNumber={setNumber}/>
                        </>

                    ): number ===4 ?(
                        <>
                            <AcademicCareer/>
                            <ButtonNextBackForm setNumber={setNumber}/>
                            
                        </>
                    ):
                    null}
                </div>
            </form>
        </ContainerForm>
    )
}

export default RegisterCreate

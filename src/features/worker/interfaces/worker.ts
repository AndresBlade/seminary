export interface personalInfoInterfaces{
    forename:string
    surename:string
    id:string
    birthDate:string
    blood:string
    medicalRecord:string
    position:string
}
export interface contactInfoInterface{
    phoneNumber:string
    descriptionNumber:string
    phoneNumberFamily:string
    descriptionNumberFamily:string
    email:string
}
export interface dataSentWorker{
    persona:{
        id:string
        forename:string
        surname:string
        email:string
        birthdate:string
        medical_record:string | null
        BloodType:string
        phone:{
            phone_number:string
            description:string | null
        }[]
        social:{
            social_media_category:number
            link:string
        }[]
    }
    job_position:string
}
export interface dataGetWorker{
    position:string
    person:{
        id:string
        profile_picture_path:string
        forename:string
        surname:string
        email:string
        medical_record:string
        BloodType:string
        date_String:string
        cellpones:{
            phone_number:string
            description:string
        }[]
        social:{
            id:number
            link:string
        }[]
    }

    
}
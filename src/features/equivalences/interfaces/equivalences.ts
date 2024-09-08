export interface seminarian{
    id: string,
    apostleships: string,
    location: string,
    Ministery: string,
    stage: number,
    status: string,
    parish_id: number,
    diocesi_id: number,
    degrees: 
        {
            id: number,
            description: string,
            link: string,
            user_id: string
        }[],
    person: {
        id:string,
        profile_picture_path: string
        forename: string
        surname: string
        email: string
        birthdate: string
        medical_record: string,
        BloodType: string,
        cellpones: 
            {
                phone_number: string,
                description: string
            }[],
        medias: 
            {
                social_media_category: number,
                link: string
            }[],
        date_String: string
    },
    diocesi_name: string
}

export interface subjects{
    enrollment:{
        seminarian_id:string,
        stage:{
            name:string,
            stage:{
                course:string,
                subject:{
                    id:number,
                    name:string,
                    semester:number
                }[]
            }[]
        }[]
    }
}
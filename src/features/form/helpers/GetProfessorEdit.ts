export interface professor{
    person:{
        id:string
        profile_picture_path:string
        forename:string
        surname:string
        email:string
        birthdate:string
        medical_record:string
        BloodType:string
        date_String:string
    }
    social:[{
        social_media_category:number
        link:string
    }]
    phone_number: [
            {
                phone_number: string,
                description: string
            },
            {
                phone_number: string,
                description: string
            }
    ]
    status_id_proffesor:number
    status_user:boolean
    degrees: [
            {
                id: number,
                description:string ,
                link: string,
                user_id: string
            }
        ]
    instructor:{
        is_instructor?:boolean
        professor_id:string
        starting_date:string
        instructor_position:string
        status:number
        starting_date_string:string
    }
    Role_id: number
        parish: {
            id: number,
            diocese_id: number
        }
}

export function GetProfessorEdit(id:string,token:string):Promise<professor[]>{
    return fetch(`http://127.0.0.1:3000/professor/?id=V-${id}`,
        {
            headers:{
                auth: token
            }
        }
    ).then((response)=>{
        return response.json()
    }).then(data => data as professor[])
    
}

interface seminarian{
    persona:{
        id:string
        forename:string
        surname:string
        email:string
        birthdate:string
        medical_record:string | null
        BloodType:string
        phone:{
            phone_number:string,
            description:string | null
        }[]
        social:{
            social_media_category:number,
            link:string
        }[]
    }
    user:{
        degree:[
            {
                description:string
                link:string
            }
        ],
        parish_id:number
    }
    ForeingSeminarian?:{
        seminary_name:string
        stage:string
        stage_year:number
    } | null 
    location:string
    apostleships:string
    ministery:string
}



async function CreateSeminarian({data, imageFile,token}:{data:seminarian, imageFile:File,token:string}):Promise<Response>{
    const formData = new FormData();
    formData.append('picture',imageFile);
    formData.append('data',JSON.stringify(data))

    const response = await fetch(`http://127.0.0.1:3000/seminarian/create/${data.persona.id}`,{
        method:'POST',
        mode:'cors',
        credentials:'same-origin',
        headers:{
            auth:token
        },
        body:formData
    })

    return response
}

export {CreateSeminarian}
import { Worker } from "../../../pages/Worker"

interface Worker{
    persona:{
        id:string,
        forename:string,
        surname: string,
        email:string,
        birthdate:string,
        medical_record: string | null,
        BloodType:string
    }
    telefono:{
        phone_numbre:string,
        description:string
    }[]
    social:{
        social_media_category:number,
        link:string
    }[]
    job_position:string
    
}

async function CreateWorker({data, imageFile}:{data:Worker,imageFile:File}): Promise<Response> {
    const formData = new FormData();
    formData.append('file',imageFile);
    formData.append('data',JSON.stringify(data))
    console.log(data)
    const response = await fetch(`http://127.0.0.1:3000/worker/${data.persona.id}`,{
        method:'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin',
        body:formData
            
    });
    console.log(response);

    return response;

}
export {CreateWorker};
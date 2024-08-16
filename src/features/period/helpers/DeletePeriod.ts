interface DeletePeriodProps{
    id:string
    token:string
    url:string
}

export async function DeletePeriod({id,token,url}:DeletePeriodProps) {

    await fetch(`${url}/delete/${id}`,{
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        headers:{
            auth:token,
            'Content-Type': 'application/json',
        }
    })
    
    
}
interface DeleteUserProps{
    id:string
    token:string
    url:string
}

export async function DeleteUser({id,token,url}:DeleteUserProps) {

    await fetch(`http://127.0.0.1:3000/${url}/${id}`,{
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        headers:{
            auth:token,
            'Content-Type': 'application/json',
        }
    })
    
    
}
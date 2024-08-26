export async function DeleteSubjectsRegistered({id,token}:{id:number,token:string}) {
    return await fetch(`http://127.0.0.1:3000/enrollment/${id}`,{
        method:'DELETE',
        mode:'cors',
        headers:{
            'Content-type':'application/json',
            auth:token
        }
    })
}
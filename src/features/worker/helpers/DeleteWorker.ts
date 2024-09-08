export async function DeleteWorker({id,token}:{id:string,token:string}) {
    return await fetch(`${import.meta.env.VITE_URL}/worker/${id}`,{
        method:'DELETE',
        mode:'cors',
        credentials: 'same-origin',
        headers:{
            auth:token,
            'Content-Type': 'application/json',

        }

    })
}
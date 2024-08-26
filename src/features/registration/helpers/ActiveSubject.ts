export async function ActiveSubject({id,token}:{id:number,token:string}) {
    return await fetch(`http://127.0.0.1:3000/enrollment/${id}`,{
        method:'PUT',
        mode:'cors',
        headers:{
            'Content-Type':'application/json',
            auth:token
        },body:JSON.stringify({
            status:"CURSANDO"
        })
    })
}
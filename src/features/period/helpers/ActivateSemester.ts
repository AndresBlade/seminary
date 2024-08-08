export async function ActivateSemester({id,token}:{id:number,token:string}) {

    return await fetch(`http://127.0.0.1:3000/AcademicTerm/activate/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            auth:token
        },
    })
    
}
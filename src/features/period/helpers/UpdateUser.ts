export async function UpdateUser({id, token,start_date, end_date}:{id:string, token:string,start_date:string,end_date:string}) {
    return await fetch(`http://127.0.0.1:3000/AcademicTerm/`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            auth:token
        },
        body:JSON.stringify({
            id:Number(id),
            start_date:start_date,
            end_date:end_date
        })
        
    })
}
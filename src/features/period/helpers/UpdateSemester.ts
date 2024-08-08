export async function UpdateSemester(id:number,token:string) {
    return await fetch(`http://127.0.0.1:3000/AcademicTerm/`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            auth:token
        },
        body:JSON.stringify({
            id:id
        })
    })
}
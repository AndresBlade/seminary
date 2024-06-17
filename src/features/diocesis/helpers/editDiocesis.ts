
async function editDiocesis({id,name,obispo}: {id:number,name:string, obispo: string}): Promise<Response> {
    const response = await fetch(`http://127.0.0.1:3000/Diocese/${id}`,{
        method:'PUT',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name:name,
            holder:obispo
        })
            
    });
    console.log(response);

    return response;

}
export {editDiocesis};
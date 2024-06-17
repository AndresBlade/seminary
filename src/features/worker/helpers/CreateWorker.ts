
async function CreateDiocesis({data}): Promise<Response> {
    const response = await fetch('http://127.0.0.1:3000/Diocese/',{
        method:'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            data:data
        })
            
    });
    console.log(response);

    return response;

}
export {CreateDiocesis};
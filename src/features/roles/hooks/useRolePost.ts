async function useRolePost({name,description,numbers}: {name:string, description: string, numbers:number[]}){
    const response = await fetch('http://127.0.0.1:3000/role/',{
        method:'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name:name,
            description:description,
            numbers:numbers
        })
            
    }).then(Response=>{
        console.log(Response)
        if(!Response.ok){
            
            throw new Error(`Error ${response.status}: ${response.statusText}`);
    
            alert(Response.statusText);
        }
        return Response.json();
    })
    console.log(response);


    return response;
}
export {useRolePost};
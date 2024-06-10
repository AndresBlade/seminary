interface RoleResponse {
    name: string;
    description: string;
    numbers: number[];
}

async function createRole({name,description,numbers}: {name:string, description: string, numbers:number[]}): Promise<RoleResponse> {
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
            
    }).then((response: Response) => {
        console.log(response)
        if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText}`);
            alert(response.statusText);
        }
        return response.json() as Promise<RoleResponse>;
    })
    console.log(response);

    return response;

}
export {createRole};
import { Permission } from "../../roles/interfaces/Permission"

interface LoggedUser{
    permision_id:string,
    Permisos: Permission[],
    password:string,
    status: boolean,
    fecha:string
}

function LoginUser({id,password}: {id:string,password:string}){
    return fetch('http://127.0.0.1:3000/user/login/',{
        method:'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            id:id,
            password:password
        })
            
    }).then((response)=> {
        console.log(response.headers.get('auth'))
        return response.json() as Promise<LoggedUser>
    })
    
}
export {LoginUser};
interface userProps{
    person:{
        id:string
        forename:string
        surname:string
    }
    seminarian:{
        status:string
    } | null

    professor:{
        status_id:number
        instructor:{
        status:number | null
        instructor_position: string | null
        }
    } | null
}

export const GetUsers = (token:string):Promise<userProps[]>=>{
    return fetch('http://127.0.0.1:3000/user',{
        headers:{
            auth:token
        }
    }).then(response=> response.json() as Promise<userProps[]>
    )
}
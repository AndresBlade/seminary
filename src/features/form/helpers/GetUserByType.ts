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

export const GetUserByType = ({typeUser,token}:{typeUser:string,token:string}):Promise<userProps[]>=>{
    return fetch(`http://127.0.0.1:3000/user/user-by-type/?type=${typeUser}`,{
        headers:{
            auth:token
        }
    }).then(response=> response.json() as Promise<userProps[]>
    )
}
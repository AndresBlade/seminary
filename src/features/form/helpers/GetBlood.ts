import { useContext } from "react"
import { AuthContext } from "../../login/context/AuthContext"

export const GetBlood = ()=>{
    const {user} = useContext(AuthContext)
    
    if(!user) return

    return fetch('http://127.0.0.1:3000/extras/blood/',{
        headers:{
            auth:user?.token,
        },
    }).then((response)=>{
        return response.json()
    })
}

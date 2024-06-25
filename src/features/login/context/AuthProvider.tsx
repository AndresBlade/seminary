import { ReactNode, useState } from "react"
import { AuthContext } from "./AuthContext"
import { LoggedUser } from "../interfaces/LoggedUser"

interface props{
    children:ReactNode
}

const AuthProvider = ({children}:props) => {
    const [user,setUser] = useState<LoggedUser | null>(null)

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

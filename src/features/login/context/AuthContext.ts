import { Dispatch, createContext,SetStateAction } from "react"; 
import { LoggedUser } from "../interfaces/LoggedUser";

interface props{
    user:LoggedUser | null
    setUser: Dispatch<SetStateAction<LoggedUser | null>>
}
export const AuthContext = createContext<props>(
	{} as props
);
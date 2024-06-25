import { useContext } from "react";
import { AuthContext } from "../features/login/context/AuthContext";

export const Home = () => {

	const {user} = useContext(AuthContext)

	console.log(user)
	return <>Estás en en inicio</>;
};

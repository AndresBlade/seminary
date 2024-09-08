interface Parish {
	id: number;
	diocese_id: number;
	name: string;
	patron: string;
}
interface parishWrapper {
	msj: string;
	parish: Parish[];
}

export const GetParishByName = ({ name,token }: { name: string,token:string }) => {
	return fetch(`${import.meta.env.VITE_URL}/parish/search/${name}`,{
		headers:{
			auth:token
		}
	}).then(
		response => response.json() as Promise<parishWrapper>
	);
};

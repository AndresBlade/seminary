import { ParishDataContentPropss } from '../../../pages/ParishShowData';

interface Parish {
	msj: string;
	parishrepository: ParishDataContentPropss[];
}

export const GetParish = (token:string): Promise<Parish> => {
	return fetch(`${import.meta.env.VITE_URL}/parish`,{
		headers:{
			auth:token
		}
	}).then(
		response => response.json() as Promise<Parish>
	);
};

import { ParishDataContentPropss } from '../../../pages/ParishShowData';

interface Parish {
	msj: string;
	parishrepository: ParishDataContentPropss[];
}

export const GetParish = (): Promise<Parish> => {
	return fetch(`${import.meta.env.VITE_URL}/parish`).then(
		response => response.json() as Promise<Parish>
	);
};

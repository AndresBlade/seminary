import { ParishDataContentPropss } from '../../../pages/ParishShowData';

interface Parish {
	msj: string;
	parishrepository: ParishDataContentPropss[];
}

export const GetParish = (): Promise<Parish> => {
	return fetch('https://wh1372200.ispot.cc/parish').then(
		response => response.json() as Promise<Parish>
	);
};

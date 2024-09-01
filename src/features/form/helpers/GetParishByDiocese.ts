import { getParishByDioceseProps } from '../interfaces/Form';

export const GetParishByDiocese = ({
	dioceseId,
	token,
}: {
	dioceseId: string;
	token: string;
}) => {
	return fetch(
		`https://wh1372200.ispot.cc/parish/search-by-diocese/${dioceseId}`,
		{
			headers: {
				auth: token,
			},
		}
	).then(response => {
		if (!response.ok) {
			throw new Error(
				'error al listar las parroquias de la diocesis correspondiente'
			);
		}
		return response.json() as Promise<getParishByDioceseProps[]>;
	});
};

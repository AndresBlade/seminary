import React, { useCallback, useContext } from 'react';
import { AuthContext } from '../../features/login/context/AuthContext';

function useApiDelete({
	apiUrl,
	idDelete,
}: {
	apiUrl: string;
	idDelete: number;
}) {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<unknown>(null);
	const { user } = useContext(AuthContext);

	const deleteData = useCallback(async () => {
		try {
			setLoading(true);
			if (!user) return;
			const response = await fetch(
				`${apiUrl.concat(idDelete.toString())}`,
				{
					method: 'DELETE',
					mode: 'cors',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						// Otros encabezados personalizados si es necesario
						auth: user.token,
					},

					// Opcional: incluye un cuerpo si la API lo requiere
					// body: JSON.stringify({ /* Datos a enviar */ }),
				}
			);

			if (!response.ok) {
				throw new Error(
					`Error ${response.status}: ${response.statusText}`
				);
			}

			// Opcional: maneja la respuesta si la API devuelve datos
			// const data = await response.json();
			// console.log(data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}, [apiUrl, idDelete, user]);

	return { deleteData, loading, error };
}

export default useApiDelete;

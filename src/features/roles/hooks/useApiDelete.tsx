import React from 'react';

function useApiDelete(apiUrl: string,roleDelete:number) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<unknown>(null);

    const deleteData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl.concat(roleDelete.toString())}`, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    // Otros encabezados personalizados si es necesario
                },

                // Opcional: incluye un cuerpo si la API lo requiere
                // body: JSON.stringify({ /* Datos a enviar */ }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            // Opcional: maneja la respuesta si la API devuelve datos
            // const data = await response.json();
            // console.log(data);

            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return { deleteData, loading, error };
}

export default useApiDelete;
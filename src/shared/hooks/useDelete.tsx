import React, { useCallback } from 'react';

function useApiDelete({apiUrl,idDelete}:{apiUrl:string,idDelete:string}) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<unknown>(null);


    const deleteData = useCallback(async() => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl.concat(idDelete.toString())}`, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            setError(error);
        }finally{
            setLoading(false);
        } 
    }, [apiUrl,idDelete]);

    return { deleteData, loading, error };
}

export default useApiDelete;
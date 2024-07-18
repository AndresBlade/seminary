import React, { useCallback, useEffect } from 'react'


function useGetEdit<T>(apiUrl: string) {
    const [dataEdit, setDataEdit] = React.useState<T | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<unknown>(null)

    const fetchData = useCallback( async ()=>{
        try {
            const response = await fetch(apiUrl);
            if(!response.ok){
                throw new Error('An error occurred while fetching the data');
            }
            const data = (await response.json()) as T;
            setDataEdit(data);
            setLoading(false);
        } catch (Error) {
            setError(Error);
            setLoading(false);
        }
    },[]);
    useEffect(()=>{
        fetchData().catch(console.error);
    },[apiUrl, fetchData]);

    return {dataEdit, loading, error,setDataEdit};
}

export default useGetEdit;
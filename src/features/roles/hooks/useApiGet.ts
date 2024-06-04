import React, { useEffect } from 'react'


function useApiGet(apiUrl: string) {
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<unknown>(null)

    const fetchData = async ()=>{
        try {
            const response = await fetch(apiUrl);
            if(!response.ok){
                throw new Error('An error occurred while fetching the data');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (Error) {
            setError(Error);
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchData();
    },[apiUrl]);

    return {data, loading, error};
}
export default useApiGet;
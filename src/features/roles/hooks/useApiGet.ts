import React, { useCallback, useEffect } from 'react';

function useApiGet<T>(apiUrl: string) {
	const [data, setData] = React.useState<T | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<unknown>(null);

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('An error occurred while fetching the data');
			}
			const data = (await response.json()) as T;
			setData(data);
			setLoading(false);
		} catch (Error) {
			setError(Error);
			setLoading(false);
		}
	}, [apiUrl]);
	useEffect(() => {
		fetchData().catch(console.error);
	}, [apiUrl, fetchData]);

	return { data, loading, error, setData };
}

export default useApiGet;

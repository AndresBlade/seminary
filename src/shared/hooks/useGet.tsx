import React, { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../features/login/context/AuthContext';

function UseGet<T>(apiUrl: string) {
	const [data, setData] = React.useState<T | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<unknown>(null);
	const { user } = useContext(AuthContext);

	const fetchData = useCallback(async () => {
		try {
			if (!user) return;
			const response = await fetch(apiUrl, {
				headers: {
					auth: user.token,
				},
			});
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
	}, []);
	useEffect(() => {
		fetchData().catch(console.error);
	}, [apiUrl, fetchData]);

	return { data, loading, error };
}

export default UseGet;

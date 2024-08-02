import React, { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../features/login/context/AuthContext';

function UseGet<T>(apiUrl: string) {
	const [data, setData] = React.useState<T | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<unknown>(null);
	const { user } = useContext(AuthContext);

	const fetchData = useCallback(
		async (token: string) => {
			try {
				const response = await fetch(apiUrl, {
					headers: { auth: token },
				});
				if (!response.ok) {
					throw new Error(
						'An error occurred while fetching the data'
					);
				}
				const data = (await response.json()) as T;
				setData(data);
				setLoading(false);
			} catch (Error) {
				setError(Error);
				setLoading(false);
			}
		},
		[apiUrl]
	);
	useEffect(() => {
		if (!user) return;
		fetchData(user.token).catch(console.error);
	}, [apiUrl, fetchData, user]);

	return { data, loading, error, setData, setError };
}

export default UseGet;

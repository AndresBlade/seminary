import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../helpers/logout';

export const useLogout = () => {
	const { user, setUser } = useContext(AuthContext);

	return () => {
		if (user) {
			logout(user.token)
				.then(response => {
					if (response.ok) setUser(null);
				})
				.catch(error => console.log(error));
		}
	};
};

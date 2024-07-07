import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../features/login/context/AuthContext';

export const ProtectedRoutes = () => {
	const {user} =useContext(AuthContext);
	if (user) return <Outlet />;
	return <Navigate to={'/'} />;
};

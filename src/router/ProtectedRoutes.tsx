import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
	const isLoggedIn = true;
	if (isLoggedIn) return <Outlet />;
	return <Navigate to={'/'} />;
};

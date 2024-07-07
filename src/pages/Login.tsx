import { useContext } from 'react';
import LoginDashboard from '../features/login/components/LoginDashboard';
import { AuthContext } from '../features/login/context/AuthContext';
import { Navigate } from 'react-router-dom';
export const Login = () => {
	const { user } = useContext(AuthContext);
	return user ? <Navigate to={'home'} /> : <LoginDashboard />;
};

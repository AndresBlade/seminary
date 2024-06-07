import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AuthenticatedLayout } from '../features/ui/layout/components/AuthenticatedLayout';
import { Worker } from '../pages/Worker';
export const router = createBrowserRouter([
	{ path: '/', element: <Login /> },
	{
		element: <ProtectedRoutes />,
		children: [
			{
				element: <AuthenticatedLayout />,
				children: [
					{ path: 'home', element: <Home /> },
					{ path: 'worker', element: <Worker /> }, // Add a comma after the first object
				],
			},
		],
	},
]);

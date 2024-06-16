import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Roles } from '../pages/Roles';
import { RoleForm } from '../pages/RoleForm';

export const router = createBrowserRouter([
	{ path: '/', element: <Login /> },
	{
		element: <ProtectedRoutes />,
		children: [
			{ path: 'home', element: <Home /> },
			{
				path: 'roles',
				children: [
					{
						index: true,
						element: <Roles />,
					},
					{ path: 'new', element: <RoleForm /> },
					{ path: ':id', element: <RoleForm /> },
				],
			},
		],
	},
]);

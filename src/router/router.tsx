import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AuthenticatedLayout } from '../features/ui/layout/components/AuthenticatedLayout';
import { DiocesisCreate } from '../pages/DiocesisCreate';
import { DiocesisTable } from '../pages/DiocesisTable';

export const router = createBrowserRouter([
	{ path: '/', element: <Login /> },
	{
		element: <ProtectedRoutes />,
		children: [
			{
				element: <AuthenticatedLayout />,
				children: [{ path: 'home', element: <Home /> },
					{path: 'diocesis', children:[
						{
							index:true,
							element: <DiocesisTable />
						},
						{path: 'new', element: <DiocesisCreate />},
						{path: ':id', element: <DiocesisCreate />}
					]}
				],

			},
		],
	},
]);

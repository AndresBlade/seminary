import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { ProtectedRoutes } from './ProtectedRoutes';
import { ParishShowData } from '../pages/ParishShowData';
import { AuthenticatedLayout } from '../features/ui/layout/components/AuthenticatedLayout';
import {ParishCreate} from '../pages/ParishCreate';

export const router = createBrowserRouter([
	{ path: '/', element: <Login /> },
	{
		element: <ProtectedRoutes />,
		children: [
			{
				element: <AuthenticatedLayout />,
				children: [{ path: 'home', element: <Home /> },
					{path: 'parish', children:[
						{
							index:true,
							element:<ParishShowData />
						},
						{path: 'new', element:<ParishCreate />},
						{path: ':id', element:<ParishCreate />}
					]}
				],


			},
		],
	},
]);

import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AuthenticatedLayout } from '../features/ui/layout/components/AuthenticatedLayout';
import { DiocesisCreate } from '../pages/DiocesisCreate';
import { DiocesisTable } from '../pages/DiocesisTable';
import { Roles } from '../pages/Roles';
import { RoleForm } from '../pages/RoleForm';
import RegisterForm from '../pages/RegisterForm';
import RegisterTable from '../pages/RegisterTable';
import { Subjects } from '../pages/Subjects';
import { SubjectForm } from '../pages/SubjectForm';

export const router = createBrowserRouter([
	{ path: '/', element: <Login /> },
	{
		element: <ProtectedRoutes />,
		children: [
			{
				element: <AuthenticatedLayout />,
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
					{
						path:'profesor',
						children:[
							{
								index:true,
								element: <RegisterTable/>
							},
							{path: 'new', element:<RegisterForm/>},
							{path: ':id', element:<RegisterForm/>}
						]
					},
					{
						path: 'diocese',
						children: [
							{
								index: true,
								element: <DiocesisTable />,
							},
							{ path: 'new', element: <DiocesisCreate /> },
							{ path: ':id', element: <DiocesisCreate /> },
						],
					},
					{
						path: 'subject',
						children: [
							{ index: true, element: <Subjects /> },
							{ path: 'new', element: <SubjectForm /> },
						],
					},
				],
			},
		],
	},
]);

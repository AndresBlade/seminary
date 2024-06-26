import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import './globalStyles/normalize.css';
import './globalStyles/styles.css';
import AuthProvider from './features/login/context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<AuthProvider>
		<RouterProvider router={router}></RouterProvider>
	</AuthProvider>
);

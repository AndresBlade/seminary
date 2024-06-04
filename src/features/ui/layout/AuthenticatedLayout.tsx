import { useState } from 'react';
import { Sidebar } from '../sidebar/components/Sidebar';
import { useDelayUnmount } from '../sidebar/hooks/useDelayUnmount';
import { Outlet } from 'react-router-dom';
export const AuthenticatedLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const shouldSidebarRender = useDelayUnmount(isSidebarOpen, 500);
	return (
		<>
			{shouldSidebarRender && (
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
			)}
			<Outlet />
		</>
	);
};

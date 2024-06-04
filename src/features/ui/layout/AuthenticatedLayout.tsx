import { useEffect, useState } from 'react';
import { Sidebar } from '../sidebar/components/Sidebar';
import { useDelayUnmount } from '../sidebar/hooks/useDelayUnmount';
import { Outlet } from 'react-router-dom';
import { useIsDeviceSizeLess } from '../sidebar/hooks/useIsDeviceSizeLess';
export const AuthenticatedLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const isMobile = useIsDeviceSizeLess(480);

	useEffect(() => {
		if (!isMobile && !isSidebarOpen) {
			setIsSidebarOpen(true);
		}
	}, [isMobile]);

	const shouldSidebarRender = useDelayUnmount(isSidebarOpen, 1000);
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

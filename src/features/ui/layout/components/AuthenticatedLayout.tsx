import { useEffect, useState } from 'react';
import { Sidebar } from '../../sidebar/components/Sidebar';
import { useDelayUnmount } from '../../../../shared/hooks/useDelayUnmount';
import { Outlet } from 'react-router-dom';
import { useIsDeviceSizeLess } from '../../sidebar/hooks/useIsDeviceSizeLess';
import { Header } from '../../header/components/Header';
import layoutCSS from '../styles/layout.module.css';
import { PageContainer } from '../../container/components/PageContainer';
export const AuthenticatedLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const isMobile = useIsDeviceSizeLess(480);

	useEffect(() => {
		if (!isMobile && !isSidebarOpen) {
			setIsSidebarOpen(true);
		}
	}, [isMobile, isSidebarOpen]);

	const shouldSidebarRender = useDelayUnmount(isSidebarOpen, 700);
	return (
		<div className={layoutCSS.layout}>
			<Header
				className={layoutCSS.header}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			{shouldSidebarRender && (
				<Sidebar
					className={layoutCSS.sidebar}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
			)}
			<div className={layoutCSS.content}>
				<PageContainer>
					<Outlet />
				</PageContainer>
			</div>
		</div>
	);
};

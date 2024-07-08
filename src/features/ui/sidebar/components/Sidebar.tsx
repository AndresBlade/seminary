import { sidebarData } from '../data/sidebarModulesData';
import { ItemContainer } from './ItemContainer';
import { SidebarHeader } from './SidebarHeader';
import sidebarCSS from '../styles/sidebar.module.css';
import { sidebarSpecialActionsData } from '../data/sidebarSpecialActionsData';
import closeSVG from '../../../../assets/MaterialSymbolsClose.svg';
import { ElementRef, useEffect, useRef } from 'react';
import { useIsDeviceSizeLess } from '../hooks/useIsDeviceSizeLess';

interface Props {
	isSidebarOpen: boolean;
	className: string;
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({
	isSidebarOpen,
	setIsSidebarOpen,
	className,
}: Props) => {
	const sidebarStyle = isSidebarOpen
		? sidebarCSS.sidebar
		: sidebarCSS.hiddenSidebar;

	const closeButtonStyle = isSidebarOpen
		? sidebarCSS.closeButton
		: sidebarCSS.hiddenCloseButton;

	const isMobile = useIsDeviceSizeLess(480);

	const onCloseButtonClick = () => {
		setIsSidebarOpen(false);
	};

	const sidebarRef = useRef<ElementRef<'aside'>>(null);

	useEffect(() => {
		if (isMobile) {
			const handleClickOutsideSidebar = (e: MouseEvent) => {
				const target = e.target as Node;
				if (sidebarRef.current && !sidebarRef.current.contains(target))
					setIsSidebarOpen(false);
			};
			setTimeout(() => {
				document.addEventListener('click', handleClickOutsideSidebar);
			}, 700);
			return () =>
				document.removeEventListener(
					'click',
					handleClickOutsideSidebar
				);
		}
	}, [setIsSidebarOpen, isMobile]);

	return (
		<>
			<aside className={`${sidebarStyle} ${className}`} ref={sidebarRef}>
				<SidebarHeader />
				<ul className={sidebarCSS.items}>
					{sidebarData.map((sidebarItem, index) => (
						<ItemContainer key={index} data={sidebarItem} />
					))}
				</ul>
				<ul className={sidebarCSS.items}>
					{sidebarSpecialActionsData.map((sidebarItem, index) => (
						<ItemContainer key={index} data={sidebarItem} />
					))}
				</ul>
			</aside>
			<button className={closeButtonStyle} onClick={onCloseButtonClick}>
				<img
					src={closeSVG}
					className={sidebarCSS.closeButtonImg}
					alt="close button"
				/>
			</button>
		</>
	);
};

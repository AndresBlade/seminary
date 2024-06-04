import { sidebarData } from '../data/sidebarModulesData';
import { Item } from './Item';
import { SidebarHeader } from './SidebarHeader';
import sidebarCSS from '../styles/sidebar.module.css';
import { sidebarSpecialActionsData } from '../data/sidebarSpecialActionsData';
import closeSVG from '../../../../assets/MaterialSymbolsClose.svg';

interface Props {
	isSidebarOpen: boolean;
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
	const sidebarStyle = isSidebarOpen
		? sidebarCSS.sidebar
		: sidebarCSS.hiddenSidebar;

	const closeButtonStyle = isSidebarOpen
		? sidebarCSS.closeButton
		: sidebarCSS.hiddenCloseButton;

	const onCloseButtonClick = () => {
		setIsSidebarOpen(false);
	};

	return (
		<>
			<aside className={sidebarStyle}>
				<SidebarHeader />
				<ul className={sidebarCSS.items}>
					{sidebarData.map((sidebarItem, index) => (
						<Item key={index} data={sidebarItem} />
					))}
				</ul>
				<ul className={sidebarCSS.items}>
					{sidebarSpecialActionsData.map((sidebarItem, index) => (
						<Item key={index} data={sidebarItem} />
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

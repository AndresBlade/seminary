import { sidebarData } from '../data/sidebarModulesData';
import { Item } from './Item';
import { SidebarHeader } from './SidebarHeader';
import sidebarCSS from '../styles/sidebar.module.css';
import { sidebarSpecialActionsData } from '../data/sidebarSpecialActionsData';

export const Sidebar = () => {
	return (
		<aside className={sidebarCSS.sidebar}>
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
	);
};

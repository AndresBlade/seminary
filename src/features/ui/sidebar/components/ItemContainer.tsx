import { SidebarItemData } from '../interface/sidebarItemData';
import sidebarCSS from '../styles/sidebar.module.css';
import { useEffect, useState } from 'react';
import { Submenu } from './Submenu';
import { useDelayUnmount } from '../hooks/useDelayUnmount';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { Item } from './Item';
import { useLogout } from '../../../login/hooks/useLogout';

interface Props {
	data: SidebarItemData;
}

export const ItemContainer = ({ data }: Props) => {
	const [isSubmenuShowing, setIsSubmenuShowing] = useState(false);
	const shouldRender = useDelayUnmount(isSubmenuShowing, 300);
	const location = useLocation();
	const logout = useLogout();

	useEffect(() => {
		if (data.type === 'submenu') {
			const urlMatchesPath = data.children.some(submenuItem => {
				return matchPath(submenuItem.path, location.pathname);
			});
			setIsSubmenuShowing(urlMatchesPath);
		}
	}, [data, location.pathname]);

	const arrowStyle =
		data.type === 'item' || data.type === 'logout'
			? sidebarCSS.hiddenArrow
			: !isSubmenuShowing
			? sidebarCSS.arrow
			: sidebarCSS.rotatedArrow;
	const itemStyle = !isSubmenuShowing
		? sidebarCSS.item
		: sidebarCSS.clickedItemWithSubmenu;

	const itemLogoStyle = !isSubmenuShowing
		? sidebarCSS.itemLogo
		: sidebarCSS.clickedItemLogo;
	const handleClick = () => {
		console.log('aguas');

		if (data.type === 'item') return;

		if (data.type === 'submenu') {
			setIsSubmenuShowing(show => {
				return !show;
			});
			return;
		}

		console.log('will log out');

		logout();
	};

	return (
		<li className={sidebarCSS.itemContainer}>
			{data.type === 'item' ? (
				<NavLink to={data.path} className={sidebarCSS.itemLink}>
					<Item
						data={data}
						arrowStyle={arrowStyle}
						itemLogoStyle={sidebarCSS.itemLogo}
						itemStyle={sidebarCSS.item}
						handleClick={handleClick}
					/>
				</NavLink>
			) : data.type === 'logout' ? (
				<Item
					data={data}
					arrowStyle={arrowStyle}
					itemLogoStyle={itemLogoStyle}
					itemStyle={itemStyle}
					handleClick={handleClick}
				/>
			) : (
				<>
					<Item
						data={data}
						arrowStyle={arrowStyle}
						itemLogoStyle={itemLogoStyle}
						itemStyle={itemStyle}
						handleClick={handleClick}
					/>
					{shouldRender && (
						<Submenu
							submenuItemData={data.children}
							isSubmenuShowing={isSubmenuShowing}
						/>
					)}
				</>
			)}
		</li>
	);
};

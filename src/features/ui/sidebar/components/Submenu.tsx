import { SidebarItemChildrenData } from '../interface/sidebarItemData';
import sidebarCSS from '../styles/sidebar.module.css';
import arrowIconPath from '../../../../assets/MaterialSymbolsArrowForwardIos.svg';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
	submenuItemData?: SidebarItemChildrenData[];
	isSubmenuShowing: boolean;
}

export const Submenu = ({ submenuItemData, isSubmenuShowing }: Props) => {
	const [hasAnimationStarted, setHasAnimationStarted] = useState(false);

	setTimeout(() => {
		setHasAnimationStarted(true);
	}, 30);
	return (
		<div
			className={
				hasAnimationStarted
					? isSubmenuShowing
						? sidebarCSS.submenu
						: sidebarCSS.hiddenSubmenu
					: sidebarCSS.hiddenSubmenu
			}
		>
			<div>
				{submenuItemData?.map((submenuItem, index) => (
					<NavLink
						to={submenuItem.path}
						className={({ isActive }) =>
							isActive
								? sidebarCSS.activeSubmenuItem
								: sidebarCSS.submenuItem
						}
						key={index}
						end
					>
						<img
							src={arrowIconPath}
							alt={submenuItem.content}
							className={sidebarCSS.submenuItemLogo}
						/>
						<p className={sidebarCSS.itemContent}>
							{submenuItem.content}
						</p>
					</NavLink>
				))}
			</div>
		</div>
	);
};

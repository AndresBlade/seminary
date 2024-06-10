import { SidebarItemChildrenData } from '../interface/sidebarItemData';
import sidebarCSS from '../styles/sidebar.module.css';
import arrowIconPath from '../../../../assets/MaterialSymbolsArrowForwardIos.svg';
import { useState } from 'react';

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
					<div className={sidebarCSS.submenuItem} key={index}>
						<img
							src={arrowIconPath}
							alt={submenuItem.content}
							className={sidebarCSS.submenuItemLogo}
						/>
						<p className={sidebarCSS.itemContent}>
							{submenuItem.content}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

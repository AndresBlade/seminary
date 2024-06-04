import { SidebarItemChildrenData } from '../interface/sidebarItemData';
import sidebarCSS from '../styles/sidebar.module.css';
import arrowIconPath from '../../../../assets/MaterialSymbolsArrowForwardIos.svg';

interface Props {
	submenuItemData?: SidebarItemChildrenData[];
	isSubmenuShowing: boolean;
}

export const Submenu = ({ submenuItemData, isSubmenuShowing }: Props) => {
	return (
		<div
			className={
				isSubmenuShowing ? sidebarCSS.submenu : sidebarCSS.hiddenSubmenu
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

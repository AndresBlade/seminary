import { SidebarItemData } from '../interface/sidebarItemData';
import arrowIconPath from '../../../../assets/MaterialSymbolsArrowForwardIos.svg';
import sidebarCSS from '../styles/sidebar.module.css';
import { useState } from 'react';
import { Submenu } from './Submenu';
import { useDelayUnmount } from '../hooks/useDelayUnmount';

interface Props {
	data: SidebarItemData;
}

export const Item = ({ data }: Props) => {
	const [isSubmenuShowing, setisSubmenuShowing] = useState(false);
	const shouldRender = useDelayUnmount(isSubmenuShowing, 300);
	const arrowStyle = !isSubmenuShowing
		? sidebarCSS.arrow
		: sidebarCSS.rotatedArrow;
	const itemStyle = !isSubmenuShowing
		? sidebarCSS.item
		: sidebarCSS.clickedItemWithSubmenu;

	const itemLogoStyle = !isSubmenuShowing
		? sidebarCSS.itemLogo
		: sidebarCSS.clickedItemLogo;

	return (
		<li className={sidebarCSS.itemContainer}>
			<div
				className={itemStyle}
				onClick={() => {
					if (data.children)
						setisSubmenuShowing(show => {
							return !show;
						});
				}}
			>
				<img
					src={data.iconPath}
					alt={data.content}
					className={itemLogoStyle}
				/>
				<p className={sidebarCSS.itemContent}>{data.content}</p>
				{data.children && (
					<img
						src={arrowIconPath}
						className={arrowStyle}
						alt={`Flecha de submenu de ${data.content}`}
					/>
				)}
			</div>
			{data.children && shouldRender && (
				<Submenu
					submenuItemData={data.children}
					isSubmenuShowing={isSubmenuShowing}
				/>
			)}
		</li>
	);
};

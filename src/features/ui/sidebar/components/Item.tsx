import { SidebarItemData } from '../interface/sidebarItemData';
import arrowIconPath from '../../../../assets/MaterialSymbolsArrowForwardIos.svg';
import sidebarCSS from '../styles/sidebar.module.css';
import { useState } from 'react';
import { Submenu } from './Submenu';

interface Props {
	data: SidebarItemData;
}

export const Item = ({ data }: Props) => {
	const [isSubmenuShowing, setisSubmenuShowing] = useState(false);
	const itemContainerStyle = !isSubmenuShowing
		? sidebarCSS.itemContainer
		: sidebarCSS.clickedItemContainer;
	const arrowStyle = !isSubmenuShowing
		? sidebarCSS.arrow
		: sidebarCSS.rotatedArrow;
	console.log(isSubmenuShowing);
	console.log(arrowStyle);
	const itemStyle = !isSubmenuShowing
		? sidebarCSS.item
		: sidebarCSS.clickedItemWithSubmenu;

	const itemLogoStyle = !isSubmenuShowing
		? sidebarCSS.itemLogo
		: sidebarCSS.clickedItemLogo;

	return (
		<li className={itemContainerStyle}>
			<div
				className={itemStyle}
				onClick={() => {
					if (data.children)
						setisSubmenuShowing(show => {
							console.log(show);
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
			<Submenu
				submenuItemData={data.children}
				isSubmenuShowing={isSubmenuShowing}
			/>
		</li>
	);
};

import { SidebarItemData } from '../interface/sidebarItemData';

import arrowIconPath from '../../../../assets/MaterialSymbolsArrowForwardIos.svg';
import sidebarCSS from '../styles/sidebar.module.css';
interface Props {
	data: SidebarItemData;
	arrowStyle: string;
	itemStyle: string;
	itemLogoStyle: string;
	handleClick: () => void;
}

export const Item = ({
	data,
	itemLogoStyle,
	itemStyle,
	arrowStyle,
	handleClick,
}: Props) => {
	return (
		<div className={itemStyle} onClick={handleClick}>
			<img
				src={data.iconPath}
				alt={data.content}
				className={itemLogoStyle}
			/>
			<p className={sidebarCSS.itemContent}>{data.content}</p>
			<img
				src={arrowIconPath}
				className={arrowStyle}
				alt={`Flecha de submenu de ${data.content}`}
			/>
		</div>
	);
};

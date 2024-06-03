import { SidebarItemData } from '../interface/sidebarItemData';
import arrowIconPath from '../../../../assets/MaterialSymbolsArrowForwardIos.svg';
import sidebarCSS from '../styles/sidebar.module.css';

interface Props {
	data: SidebarItemData;
}

export const Item = ({ data }: Props) => {
	return (
		<li className={sidebarCSS.item}>
			<img
				src={data.iconPath}
				alt={data.content}
				className={sidebarCSS.itemLogo}
			/>
			<p className={sidebarCSS.itemContent}>{data.content}</p>
			{data.children && (
				<img
					src={arrowIconPath}
					className={sidebarCSS.arrow}
					alt={`Flecha de submenu de ${data.content}`}
				/>
			)}
		</li>
	);
};

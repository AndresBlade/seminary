import { SidebarItemData } from '../interface/sidebarItemData';
import gearIcon from '../../../../assets/MaterialSymbolsSettingsRounded.svg';
import exitIcon from '../../../../assets/MaterialSymbolsExitToApp.svg';

export const sidebarSpecialActionsData: SidebarItemData[] = [
	{
		content: 'Configuración',
		iconPath: gearIcon,
		type: 'item',
		path: '',
	},
	{
		content: 'Salir',
		iconPath: exitIcon,
		type: 'item',
		path: '',
	},
];

import { SidebarItemData } from '../interface/sidebarItemData';
import gearIcon from '../../../../assets/MaterialSymbolsSettingsRounded.svg';
import exitIcon from '../../../../assets/MaterialSymbolsExitToApp.svg';

export const sidebarSpecialActionsData: SidebarItemData[] = [
	{
		content: 'Cambiar contraseña',
		iconPath: gearIcon,
		type: 'item',
		path: 'change',
	},
	{
		content: 'Salir',
		iconPath: exitIcon,
		type: 'logout',
	},
];

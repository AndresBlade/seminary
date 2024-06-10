import homeIcon from '../../../../assets/MaterialSymbolsHomeOutlineRounded.svg';
import graduationCapIcon from '../../../../assets/MaterialSymbolsSchoolOutline.svg';
import professorIcon from '../../../../assets/MaterialSymbolsInteractiveSpaceOutlineSharp.svg';
import engineerIcon from '../../../../assets/MaterialSymbolsEngineeringOutline.svg';
import churchIcon from '../../../../assets/MaterialSymbolsChurchOutline.svg';
import graphicIcon from '../../../../assets/MaterialSymbolsBarChart4BarsRounded.svg';
import { SidebarItemData } from '../interface/sidebarItemData';

export const sidebarData: SidebarItemData[] = [
	{ content: 'Inicio', iconPath: homeIcon },
	{
		content: 'Seminarista',
		iconPath: graduationCapIcon,
		children: [
			{ content: 'Añadir seminarista' },
			{ content: 'Eliminar seminarista' },
		],
	},
	{
		content: 'Profesor',
		iconPath: professorIcon,
		children: [
			{ content: 'Añadir Profesor' },
			{ content: 'Eliminar Profesor' },
		],
	},
	{
		content: 'Formador',
		iconPath: professorIcon,
		children: [
			{ content: 'Añadir Formador' },
			{ content: 'Eliminar Formador' },
		],
	},
	{
		content: 'Trabajador',
		iconPath: engineerIcon,
		children: [
			{ content: 'Añadir Trabajador' },
			{ content: 'Eliminar Trabajador' },
		],
	},
	{
		content: 'Eclesiástico',
		iconPath: churchIcon,
		children: [{ content: 'Gestionar diócesis' }],
	},
	{
		content: 'Reportes',
		iconPath: graphicIcon,
		children: [{ content: 'Gestionar diócesis' }],
	},
];

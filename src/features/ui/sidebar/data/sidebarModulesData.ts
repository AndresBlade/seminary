import homeIcon from '../../../../assets/MaterialSymbolsHomeOutlineRounded.svg';
import graduationCapIcon from '../../../../assets/MaterialSymbolsSchoolOutline.svg';
import professorIcon from '../../../../assets/MaterialSymbolsInteractiveSpaceOutlineSharp.svg';
import engineerIcon from '../../../../assets/MaterialSymbolsEngineeringOutline.svg';
import churchIcon from '../../../../assets/MaterialSymbolsChurchOutline.svg';
import graphicIcon from '../../../../assets/MaterialSymbolsBarChart4BarsRounded.svg';
import personIcon from '../../../../assets/MaterialSymbolsPerson.svg';
import { SidebarItemData } from '../interface/sidebarItemData';
import subjectIcon from '../../../../assets/MaterialSymbolsBook.svg';

export const sidebarData: SidebarItemData[] = [
	{ content: 'Inicio', path: 'home', iconPath: homeIcon, type: 'item' },
	{
		content: 'Seminarista',
		iconPath: graduationCapIcon,
		type: 'submenu',

		children: [
			{ content: 'Añadir seminarista', path: '' },
			{ content: 'Eliminar seminarista', path: '' },
		],
	},
	{
		content: 'Profesor',
		type: 'submenu',
		iconPath: professorIcon,


		children: [
			{ content: 'Añadir Profesor', path: 'Profesor/new' },
			{ content: 'Eliminar Profesor', path: '' },
		],
	},
	{
		content: 'Formador',
		type: 'submenu',

		iconPath: professorIcon,
		children: [
			{ content: 'Añadir Formador', path: '' },
			{ content: 'Eliminar Formador', path: '' },
		],
	},
	{
		content: 'Trabajador',
		type: 'submenu',
		iconPath: engineerIcon,

		children: [
			{ content: 'Añadir Trabajador', path: '' },
			{ content: 'Eliminar Trabajador', path: '' },
		],
	},
	{
		content: 'Usuario',
		iconPath: personIcon,
		type: 'submenu',
		children: [
			{ content: 'Agregar usuario', path: '' },
			{ content: 'Lista de usuarios', path: 'user/list' },
			{ content: 'Crear rol de usuario', path: 'roles/new' },
			{ content: 'Lista de roles', path: 'roles' },
		],
	},
	{
		content: 'Materias',
		iconPath: subjectIcon,
		type: 'submenu',
		children: [
			{ content: 'Agregar Materia', path: 'subject/new' },
			{ content: 'Lista de materias', path: 'subject' },
		],
	},
	{
		content: 'Eclesiástico',
		type: 'submenu',
		iconPath: churchIcon,
		children: [
			{ content: 'Lista de diócesis', path: 'diocese' },
			{ content: 'Crear diócesis', path: 'diocese/new' },
			{ content: 'Lista de parroquias', path: 'parish' },
			{ content: 'Crear parroquia', path: 'parish/new' },
		],
	},
	{
		content: 'Reportes',
		type: 'submenu',
		iconPath: graphicIcon,
		children: [{ content: 'Gestionar diócesis', path: 'periodo' }],
	},
];

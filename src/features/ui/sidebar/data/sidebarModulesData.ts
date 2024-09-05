import homeIcon from '../../../../assets/MaterialSymbolsHomeOutlineRounded.svg';
import engineerIcon from '../../../../assets/MaterialSymbolsEngineeringOutline.svg';
import churchIcon from '../../../../assets/MaterialSymbolsChurchOutline.svg';
import personIcon from '../../../../assets/MaterialSymbolsPerson.svg';
import { SidebarItemData } from '../interface/sidebarItemData';
import subjectIcon from '../../../../assets/MaterialSymbolsBook.svg';

// {
// 	content: 'Seminarista',
// 	iconPath: graduationCapIcon,
// 	type: 'submenu',

// 	children: [
// 		{ content: 'Añadir seminarista', path: '' },
// 		{ content: 'Eliminar seminarista', path: '' },
// 	],
// },
// {
// 	content: 'Profesor',
// 	type: 'submenu',
// 	iconPath: professorIcon,

// 	children: [
// 		{ content: 'Añadir Profesor', path: 'Profesor/new' },
// 		{ content: 'Eliminar Profesor', path: '' },
// 	],
// },
// {
// 	content: 'Formador',
// 	type: 'submenu',

// 	iconPath: professorIcon,
// 	children: [
// 		{ content: 'Añadir Formador', path: '' },
// 		{ content: 'Eliminar Formador', path: '' },
// 	],
// },

// {
// 	content: 'Reportes',
// 	type: 'submenu',
// 	iconPath: graphicIcon,
// 	children: [{ content: 'Gestionar diócesis', path: 'periodo' }],
// },

export const sidebarData: SidebarItemData[] = [
	{ content: 'Inicio', path: 'home', iconPath: homeIcon, type: 'item' },
	{
		content: 'Usuarios',
		iconPath: personIcon,
		type: 'submenu',
		children: [
			{ content: 'Agregar usuario', path: 'user/new' },
			{ content: 'Lista de usuarios', path: 'user' },
			{ content: 'Crear rol de usuario', path: 'roles/new' },
			{ content: 'Lista de roles', path: 'roles' },
		],
	},
	{
		content: 'Trabajadores',
		type: 'submenu',
		iconPath: engineerIcon,

		children: [
			{ content: 'Añadir Trabajador', path: '' },
			{ content: 'Eliminar Trabajador', path: '' },
		],
	},

	{
		content: 'Académico',
		iconPath: subjectIcon,
		type: 'submenu',
		children: [
			{ content: 'Período académico', path: 'term' },
			{ content: 'Agregar Materia', path: 'subject/new' },
			{
				content: 'Asignación de materias',
				path: 'subject/instruction',
			},
			{ content: 'Lista de materias', path: 'subject' },
			{ content: 'Lista inscritos en materia', path: 'enrollment' },
			{ content: 'inscribir materia', path: 'enrollment/new' },
			{ content: 'Calificar', path: 'createAssessments' },
			{ content: 'Crear Evalución', path: 'createAssessments/new' },
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
];

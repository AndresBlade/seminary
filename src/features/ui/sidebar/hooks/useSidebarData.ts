import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../login/context/AuthContext';

import homeIcon from '../../../../assets/MaterialSymbolsHomeOutlineRounded.svg';
import engineerIcon from '../../../../assets/MaterialSymbolsEngineeringOutline.svg';
import churchIcon from '../../../../assets/MaterialSymbolsChurchOutline.svg';
import personIcon from '../../../../assets/MaterialSymbolsPerson.svg';
import { SidebarItemData } from '../interface/sidebarItemData';
import subjectIcon from '../../../../assets/MaterialSymbolsBook.svg';
import professorIcon from '../../../../assets/MaterialSymbolsInteractiveSpaceOutlineSharp.svg';
import graduationCapIcon from '../../../../assets/MaterialSymbolsSchoolOutline.svg';
import graphicIcon from '../../../../assets/MaterialSymbolsBarChart4BarsRounded.svg';
import { IsUserKnownRole } from '../helpers/isUserKnownRole';

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

const userItem: SidebarItemData = {
	content: 'Usuarios',
	iconPath: personIcon,
	type: 'submenu',
	children: [
		{ content: 'Agregar usuario', path: 'user/new' },
		{ content: 'Lista de usuarios', path: 'user' },
		{ content: 'Crear rol de usuario', path: 'roles/new' },
		{ content: 'Lista de roles', path: 'roles' },
	],
};

const professorItem: SidebarItemData = {
	content: 'Profesor',
	type: 'submenu',
	iconPath: professorIcon,

	children: [
		{ content: 'Añadir Profesor', path: 'Profesor/new' },
		{ content: 'Eliminar Profesor', path: '' },
	],
};

const seminarianItem: SidebarItemData = {
	content: 'Seminarista',
	iconPath: graduationCapIcon,
	type: 'submenu',

	children: [
		{ content: 'Añadir seminarista', path: '' },
		{ content: 'Eliminar seminarista', path: '' },
	],
};

const workerItem: SidebarItemData = {
	content: 'Trabajadores',
	type: 'submenu',
	iconPath: engineerIcon,

	children: [
		{ content: 'Añadir Trabajador', path: '' },
		{ content: 'Eliminar Trabajador', path: '' },
	],
};

const academicItem: SidebarItemData = {
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
	],
};

const ecclesiasticalItem: SidebarItemData = {
	content: 'Eclesiástico',
	type: 'submenu',
	iconPath: churchIcon,
	children: [
		{ content: 'Lista de diócesis', path: 'diocese' },
		{ content: 'Crear diócesis', path: 'diocese/new' },
		{ content: 'Lista de parroquias', path: 'parish' },
		{ content: 'Crear parroquia', path: 'parish/new' },
	],
};

const statisticsItem: SidebarItemData = {
	content: 'Reportes',
	type: 'submenu',
	iconPath: graphicIcon,
	children: [{ content: 'Gestionar diócesis', path: 'periodo' }],
};

const homeItem: SidebarItemData = {
	content: 'Inicio',
	path: 'home',
	iconPath: homeIcon,
	type: 'item',
};

export const useSidebarData = () => {
	const { user } = useContext(AuthContext);

	const [sidebarData, setSidebarData] = useState<SidebarItemData[]>([
		homeItem,
	]);

	useEffect(() => {
		if (!user) return;
		if (!IsUserKnownRole(user.role))
			return setSidebarData(sidebarData => [
				...sidebarData,
				seminarianItem,
				professorItem,
				workerItem,
				academicItem,
				ecclesiasticalItem,
				statisticsItem,
			]);
		if (user.role === 'SEMINARIAN')
			return setSidebarData(sidebarData => [
				...sidebarData,
				seminarianItem,
			]);
		if (user.role === 'PROFESOR' || user.role === 'INSTRUCTOR')
			return setSidebarData(sidebarData => [
				...sidebarData,
				professorItem,
			]);

		if (user.role === 'RECTOR' || user.role === 'VICE RECTOR')
			return setSidebarData(sidebarData => [
				...sidebarData,
				{
					content: 'Usuarios',
					iconPath: personIcon,
					type: 'submenu',
					children: [
						{ content: 'Agregar usuario', path: 'user/new' },
						{ content: 'Lista de usuarios', path: 'user' },
					],
				},
				seminarianItem,
				professorItem,
				workerItem,
				academicItem,
				ecclesiasticalItem,
				statisticsItem,
			]);
		return setSidebarData(sidebarData => [
			...sidebarData,
			userItem,
			seminarianItem,
			professorItem,
			workerItem,
			academicItem,
			ecclesiasticalItem,
			statisticsItem,
		]);
	}, [user]);

	return sidebarData;
};

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
import { ActiveAcademicTermContext } from '../../../period/context/ActiveAcademicTermContext';

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
// }

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
		{ content: 'Calificar', path: 'createAssessments' },
		{ content: 'Crear Evalución', path: 'createAssessments/new' },
	],
};

const seminarianItem: SidebarItemData = {
	content: 'Seminarista',
	iconPath: graduationCapIcon,
	type: 'submenu',

	children: [{ content: 'Tus notas', path: 'seminarianNotes' }],
};

const workerItem: SidebarItemData = {
	content: 'Trabajadores',
	type: 'submenu',
	iconPath: engineerIcon,

	children: [
		{ content: 'Añadir Trabajador', path: 'worker/new' },
		{ content: 'Lista Trabajadores', path: 'worker' },
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
	children: [
		{
			content: 'Lista de seminarista por geografía',
			path: 'report/seminarian-by-geography',
		},
		{
			content: 'Lista de seminaristas por notas',
			path: 'report/seminarian-by-grades',
		},
		{ content: 'horarios', path: 'schedules' },
	],
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

	const { isThereActiveAcademicTerm } = useContext(ActiveAcademicTermContext);

	useEffect(() => {
		if (!user) return;

		let academicItem: SidebarItemData;

		if (!isThereActiveAcademicTerm) {
			academicItem = {
				content: 'Académico',
				iconPath: subjectIcon,
				type: 'submenu',
				children: [
					{ content: 'Período académico', path: 'term' },
					{ content: 'Lista de materias', path: 'subject' },
					{
						content: 'Agregar Materia',
						path: 'subject/new',
					},
				],
			};
		}

		if (isThereActiveAcademicTerm) {
			academicItem = {
				content: 'Académico',
				iconPath: subjectIcon,
				type: 'submenu',
				children: [
					{ content: 'Período académico', path: 'term' },
					{ content: 'Lista de materias', path: 'subject' },

					{
						content: 'Lista inscritos en materia',
						path: 'enrollment',
					},
					{ content: 'Inscripción', path: 'enrollment/new' },
					{
						content: 'Asignación de materias',
						path: 'subject/instruction',
					},
				],
			};
		}

		if (!IsUserKnownRole(user.role))
			return setSidebarData(() => [
				seminarianItem,
				professorItem,
				workerItem,
				academicItem,
				ecclesiasticalItem,
				statisticsItem,
			]);
		if (user.role === 'SEMINARIAN')
			return setSidebarData(() => [homeItem, seminarianItem]);
		if (
			user.role === 'PROFESOR' ||
			user.role === 'INSTRUCTOR' ||
			user.role == 'PROPEDEUTICO'
		)
			return setSidebarData(() => [homeItem, professorItem]);

		if (user.role === 'RECTOR' || user.role === 'VICE RECTOR')
			return setSidebarData(() => [
				homeItem,
				{
					content: 'Usuarios',
					iconPath: personIcon,
					type: 'submenu',
					children: [
						{ content: 'Agregar usuario', path: 'user/new' },
						{ content: 'Lista de usuarios', path: 'user' },
					],
				},
				professorItem,
				workerItem,
				academicItem,
				ecclesiasticalItem,
				statisticsItem,
			]);
		return setSidebarData(() => [
			homeItem,
			userItem,
			seminarianItem,
			professorItem,
			workerItem,
			academicItem,
			ecclesiasticalItem,
			statisticsItem,
		]);
	}, [user, isThereActiveAcademicTerm]);

	return sidebarData;
};

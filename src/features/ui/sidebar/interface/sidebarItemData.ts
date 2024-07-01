/* eslint-disable no-mixed-spaces-and-tabs */

interface SidebarItemForLoggingOut {
	type: 'logout';
}

interface SidebarItemWithSubmenu {
	children: SidebarItemChildrenData[];
	type: 'submenu';
}

interface SidebarItemWithoutSubmenu {
	type: 'item';
	path: string;
}

export interface SidebarItemChildrenData {
	content: string;
	path: string;
}

export type SidebarItemData = {
	content: string;
	iconPath: string;
} & (
	| SidebarItemWithSubmenu
	| SidebarItemWithoutSubmenu
	| SidebarItemForLoggingOut
);

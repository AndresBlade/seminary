export interface SidebarItemData {
	content: string;
	iconPath: string;
	children?: SidebarItemChildrenData[];
}

export interface SidebarItemChildrenData {
	content: string;
}

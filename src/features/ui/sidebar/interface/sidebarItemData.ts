export interface SidebarItemData {
	content: string;
	iconPath: string;
	children?: SidebarItemChildrenData[];
}

interface SidebarItemChildrenData {
	content: string;
}

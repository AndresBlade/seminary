import { PermissionType } from './PermissionType';

export interface Permission {
	id: number;
	name: string;
	type: PermissionType;
	table: string;
}

import { KnownRole, KnownRoles } from '../interface/KnownRoles';

export const IsUserKnownRole = (role: string): role is KnownRole =>
	KnownRoles.indexOf(role as KnownRole) !== -1;

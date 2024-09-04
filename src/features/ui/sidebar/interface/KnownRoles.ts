export const KnownRoles = [
	'SUPERADMIN',
	'RECTOR',
	'VICE RECTOR',
	'PROFESOR',
	'SEMINARIAN',
	'INSTRUCTOR',
	'PROPEDEUTICO',
] as const;

export type KnownRole = (typeof KnownRoles)[number];

import { Permission } from '../../roles/interfaces/Permission';

export interface LoggedUser {
	Permisos: Permission[];
	person_id: string;
	fecha: string;
	token: string;
	role: string;
	surname: string;
	forename: string;
	profile_picture: string | null;
}

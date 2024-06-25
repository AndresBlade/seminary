import { ChangeEvent } from 'react';
import RolesCSS from '../styles/roles.module.css';

interface Props {
	value: string;
	setValue: ({
		target,
	}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	setRoleNameToSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchRoleInput = ({
	value,
	setValue,
	setRoleNameToSearch,
}: Props) => {
	return (
		<div className={RolesCSS['roles-search']}>
			<input
				type="search"
				placeholder="Buscar"
				autoComplete="off"
				name="name"
				className={RolesCSS['input-search']}
				value={value}
				onChange={setValue}
			/>
			<button
				onClick={() => setRoleNameToSearch(value)}
				className={RolesCSS['button-search']}
			>
				Buscar
			</button>
		</div>
	);
};

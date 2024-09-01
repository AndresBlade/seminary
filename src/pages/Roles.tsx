/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';

import FormCSS from '../features/subject/styles/SubjectForm.module.css';
import useApiGet from '../features/roles/hooks/useApiGet';
import { SearchRoleInput } from '../features/roles/components/SearchRoleInput';
import { Role } from '../features/roles/interfaces/Role';
import { RoleTable } from '../features/roles/components/RoleTable';
import { useForm } from '../shared/hooks/useForm';
import { TitleList } from '../features/ui/title/components/TitleList';
import { Title } from '../features/ui/title/components/Title';
import { BackgroundColoredSubtitle } from '../features/ui/title/components/BackgroundColoredSubtitle';
import { ContentContainer } from '../features/ui/container/components/ContentContainer';

const apiUrl = 'https://wh1372200.ispot.cc/role/search';

export const Roles = () => {
	const { name, onInputChange } = useForm({ name: '' });
	const [roleNameToSearch, setRoleNameToSearch] = useState('');
	const {
		data: roles,
		loading,
		error,
		setData: setRoles,
	} = useApiGet<Role[] | null>(apiUrl);

	useEffect(() => {
		if (!name) setRoleNameToSearch(name);
	}, [name]);
	return (
		<>
			<TitleList>
				<Title content="Usuarios" />
				<BackgroundColoredSubtitle content="Lista de roles" />
			</TitleList>
			<ContentContainer>
				<form className={FormCSS.form}>
					<SearchRoleInput
						setValue={onInputChange}
						value={name}
						setRoleNameToSearch={setRoleNameToSearch}
					/>
					{roles && (
						<RoleTable
							roles={
								roleNameToSearch
									? roles.filter(
											role =>
												role.name
													.toLowerCase()
													.includes(
														roleNameToSearch.toLowerCase()
													) ||
												role.description
													.toLowerCase()
													.includes(
														roleNameToSearch.toLowerCase()
													)
									  )
									: roles
							}
							error={error}
							loading={loading}
							setRoles={setRoles}
						/>
					)}
				</form>
			</ContentContainer>
		</>
	);
};

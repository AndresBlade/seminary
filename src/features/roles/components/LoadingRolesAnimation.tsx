import RolesCSS from '../styles/roles.module.css';

export const LoadingRolesAnimation = () => {
	return (
		<div className={RolesCSS['animation-container']}>
			<div className={RolesCSS['animation-loading']}></div>
			<div className={RolesCSS['animation-loading__two']}></div>
		</div>
	);
};

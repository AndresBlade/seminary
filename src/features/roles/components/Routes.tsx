import RolesCSS from '../styles/roles.module.css';

interface Props {
	tables: string[];
}

export const Routes = ({ tables }: Props) => {
	return (
		<div className={RolesCSS.routes}>
			<div className={RolesCSS.routesHeader}>
				<p>Ruta</p>
			</div>
			{tables.map((table, index) => (
				<div className={RolesCSS.route} key={index}>
					<p>{table}</p>
				</div>
			))}
		</div>
	);
};

import seminaryLogo from '../../../../assets/seminaryLogo.png';
import sidebarCSS from '../styles/sidebar.module.css';

export const SidebarHeader = () => {
	return (
		<section className={sidebarCSS.header}>
			<img
				src={seminaryLogo}
				className={sidebarCSS.headerLogo}
				alt="Logo del seminario"
			/>
			<p className={sidebarCSS.headerText}>SDP</p>
		</section>
	);
};

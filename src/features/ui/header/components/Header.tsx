import headerCSS from '../styles/header.module.css';
import menuSVG from '../../../../assets/MaterialSymbolsMenuRounded.svg';
import profilePictureSvg from '../../../../assets/MaterialSymbolsAccountCircle.svg';

interface Props {
	className: string;
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ className, setIsSidebarOpen }: Props) => {
	return (
		<header className={`${headerCSS.header} ${className}`}>
			<button
				className={headerCSS.menuButton}
				onClick={() => setIsSidebarOpen(true)}
			>
				<img
					src={menuSVG}
					alt="Ícono del menu"
					className={headerCSS.menuButtonImg}
				/>
			</button>
			<div className={headerCSS.personalInformation}>
				<p className={headerCSS.username}>Vicerrector Frank</p>
				<img
					src={profilePictureSvg}
					alt="Foto de perfil"
					className={headerCSS.profilePicture}
				/>
			</div>
			{/*Aquí va el src de la foto de perfil*/}
		</header>
	);
};

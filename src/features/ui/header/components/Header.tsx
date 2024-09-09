import headerCSS from '../styles/header.module.css';
import menuSVG from '../../../../assets/MaterialSymbolsMenuRounded.svg';
import profilePictureSvg from '../../../../assets/MaterialSymbolsAccountCircle.svg';
import { useContext } from 'react';
import { AuthContext } from '../../../login/context/AuthContext';

interface Props {
	className: string;
	setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ className, setIsSidebarOpen }: Props) => {
	const { user } = useContext(AuthContext);
	const profilePictureStyle = user?.profile_picture
		? headerCSS.profilePicture
		: headerCSS.defaultProfilePicture;

	const profilePictureURL =
		user?.profile_picture === null
			? null
			: user?.profile_picture?.includes('http')
			? user.profile_picture
			: `https://${user?.profile_picture}`;
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
				{user && (
					<p className={headerCSS.username}>
						{user.forename === 'None' && user.surname === 'Nobody'
							? 'SUPERUSUARIO'
							: `${user.forename} ${user.surname}`}
					</p>
				)}
				{user && (
					<img
						src={profilePictureURL ?? profilePictureSvg}
						alt="Foto de perfil"
						className={profilePictureStyle}
					/>
				)}
			</div>
		</header>
	);
};

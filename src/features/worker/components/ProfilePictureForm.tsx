import { ElementRef, useRef } from 'react';
import ProfilePictureFormCSS from '../styles/profilePictureForm.module.css';

interface Props {
	setProfilePicture: React.Dispatch<React.SetStateAction<FileList | null>>;
	profilePicture: FileList | null;
	title: string;
	content: string;
}

const handleFileChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	imageRef: React.RefObject<ElementRef<'img'>>
) => {
	const file = e.target.files?.[0];
	const reader = new FileReader();
	console.log('change');
	reader.addEventListener('loadend', e => {
		console.log(imageRef.current);
		if (imageRef.current && typeof e.target?.result === 'string') {
			imageRef.current.src = e.target?.result
				? e.target.result.toString()
				: '';
			imageRef.current.classList.add('formModal__imagePreview--visible');
		}
	});

	if (file) reader.readAsDataURL(file);
};

export const ProfilePictureForm = ({
	setProfilePicture,
	profilePicture,
	title,
	content,
}: Props) => {
	const profilePictureRef = useRef<ElementRef<'img'>>(null);
	return (
		<div>
			<h2>{title}</h2>
			<div className={ProfilePictureFormCSS.container}>
				<div className={ProfilePictureFormCSS.profilePictureContainer}>
					{profilePicture && (
						<img
							src={URL.createObjectURL(profilePicture[0])}
							ref={profilePictureRef}
							alt="foto de perfil"
							className={ProfilePictureFormCSS.profilePicture}
						/>
					)}
				</div>

				<div className={ProfilePictureFormCSS.fileInputContainer}>
					<p>{content}</p>
					<input
						type="file"
						onChange={e => {
							setProfilePicture(e.target.files);
							handleFileChange(e, profilePictureRef);
						}}
						name="photo"
						id="photo"
						accept="image/png, image/jpeg"
					/>
				</div>
			</div>
		</div>
	);
};

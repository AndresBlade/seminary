import { ElementRef, useRef } from 'react';
import Worker from '../styles/worker.module.css';

interface Props {
	setProfilePicture: React.Dispatch<React.SetStateAction<FileList | null>>;
	profilePicture: FileList | null;
	title: string;
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
}: Props) => {
	const profilePictureRef = useRef<ElementRef<'img'>>(null);
	return (
		<div className={Worker['worker-create__form-inputs']}>
			<h2>{title}</h2>
			<div className={Worker['worker-create__form--photo']}>
				<div className={Worker['worker-create__form--facebook']}>
					{profilePicture && (
						<img ref={profilePictureRef} alt="foto de perfil" />
					)}
					<label
						htmlFor="facebook"
						className={
							Worker['worker-create__form-facebook--label']
						}
					>
						Seleccione una foto
					</label>
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

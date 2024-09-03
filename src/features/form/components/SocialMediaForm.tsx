import { useEffect, useState } from 'react';
import FormCSS from '../styles/FormCSS.module.css';
import { SocialMediaCard } from './small_components/SocialMediaCard';
import { SocialMediaInputProps } from '../interfaces/Form';
import { socialMediaModalProps } from '../interfaces/Form';
import { TitleForm } from './small_components/TitleForm';
import { LabelForm } from './small_components/LabelForm';
import { InputForm } from './small_components/InputForm';
import IconClose from '../../../assets/MaterialSymbolsClose.svg';
import UseGet from '../../../shared/hooks/useGet';

export const SocialMediaForm = ({
	setModal,
	modal,
	setSocialMedia,
	socialMedia,
}: socialMediaModalProps) => {
	const apiUrl = `${import.meta.env.VITE_URL}/worker/socials/`;
	const { data } = UseGet<SocialMediaInputProps[]>(apiUrl);
	const [input, setInput] = useState<SocialMediaInputProps[]>([]);

	console.log(input);
	useEffect(() => {
		const newInputs = data?.filter(socialCategory => {
			return socialMedia.some(
				socialMedia => socialMedia.category === socialCategory.id
			);
		});

		if (newInputs) {
			setInput(newInputs);
		}

		console.log(data);
		console.log(socialMedia);
	}, [data, socialMedia]);

	return (
		<div className={FormCSS.socialMediaInfo}>
			<div className={FormCSS.socialMediaInfoGrid}>
				{(input as [])?.map((socialMediaMap: SocialMediaInputProps) => {
					return (
						<div
							className={FormCSS.socialMediaSelected}
							key={socialMediaMap.id}
						>
							<div className={FormCSS.socialMediaSelectedInfo}>
								<div>
									<img
										src={`http://${socialMediaMap.icon}`}
										alt={socialMediaMap.description}
										className={FormCSS.imgSelected}
									/>
									<LabelForm>
										{socialMediaMap.description}
									</LabelForm>
								</div>
								<button
									className={FormCSS.buttonSelected}
									onClick={e => {
										e.preventDefault();
										setSocialMedia(socialInfo =>
											socialInfo.filter(
												social =>
													social.category !==
													socialMediaMap.id
											)
										);
										setInput(socialInfo => {
											return socialInfo.filter(
												social =>
													social.id !==
													socialMediaMap.id
											);
										});
									}}
								>
									<img
										src={IconClose}
										alt="cerrar"
										className={
											FormCSS.closeSocialMediaSelected
										}
									/>
								</button>
							</div>

							<InputForm
								placeholder="http://redsocial.com/user"
								id={socialMediaMap.description}
								value={
									socialMedia.find(socialMediaElement => {
										return (
											socialMediaElement.category ===
											socialMediaMap.id
										);
									})?.link
								}
								onChange={e => {
									e.preventDefault();
									setSocialMedia(social => {
										const filterSocial = social.map(
											socialMediaFilter => {
												if (
													socialMediaFilter.category ===
													socialMediaMap.id
												) {
													return {
														...socialMediaFilter,
														link: e.target.value,
													};
												}
												return socialMediaFilter;
											}
										);
										return filterSocial;
									});
								}}
							/>
						</div>
					);
				})}
			</div>

			<button
				className={FormCSS.addSocialMedia}
				onClick={e => {
					e.preventDefault();
					setModal(true);
				}}
			>
				Agregar red social
			</button>

			{modal ? (
				<div className={FormCSS.modalContainer}>
					<div className={FormCSS.modalBody}>
						<div className={FormCSS.modalHeader}>
							<TitleForm title="Seleccionar red social" />
							<button
								onClick={e => {
									e.preventDefault();
									setModal(false);
								}}
							>
								<img
									src={IconClose}
									alt="Cerrar"
									className="closeModal"
								/>
							</button>
						</div>
						<div className={FormCSS.modalContent}>
							{data
								?.filter(
									socialFilter =>
										!input.some(
											inputItem =>
												inputItem.id === socialFilter.id
										)
								)
								.map(socialMediaData => {
									return (
										<SocialMediaCard
											key={socialMediaData.id}
											onClick={e => {
												e.preventDefault();
												setSocialMedia(
													socialMediaInfo => {
														return [
															...socialMediaInfo,
															{
																category:
																	socialMediaData.id,
																link: '',
															},
														];
													}
												);
												setInput(socialInfo => {
													return [
														...socialInfo,
														socialMediaData,
													];
												});
												setModal(false);
											}}
										>
											<img
												src={`http://${socialMediaData.icon}`}
												alt={
													socialMediaData.description
												}
												className={
													FormCSS.socialMediaImg
												}
											/>
											{socialMediaData.description}
										</SocialMediaCard>
									);
								})}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

import TitleCSS from '../styles/Title.module.css';

interface Props {
	content: string;
}

export const BackgroundColoredSubtitle = ({ content }: Props) => {
	return (
		<div className={TitleCSS.subtitleContainer}>
			<h2 className={TitleCSS.subtitle}>{content}</h2>
		</div>
	);
};

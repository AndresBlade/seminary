import TitleCSS from '../styles/Title.module.css';

interface Props {
	content: string;
}

export const Title = ({ content }: Props) => {
	return (
		<div className={TitleCSS.titleContainer}>
			<h1 className={TitleCSS.title}>{content}</h1>
			<div className={TitleCSS.underline}></div>
		</div>
	);
};

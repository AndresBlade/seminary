import { ReactNode } from 'react';
import TitleCSS from '../styles/Title.module.css';

interface Props {
	children: ReactNode;
}

export const TitleList = ({ children }: Props) => {
	return <div className={TitleCSS.list}>{children}</div>;
};

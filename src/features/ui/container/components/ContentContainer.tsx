import { ReactNode } from 'react';
import ContainerCSS from '../styles/container.module.css';

interface Props {
	children: ReactNode;
}

export const ContentContainer = ({ children }: Props) => {
	return <div className={ContainerCSS.contentContainer}>{children}</div>;
};

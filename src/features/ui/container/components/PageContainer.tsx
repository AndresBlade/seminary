import { ReactNode } from 'react';
import ContainerCSS from '../styles/container.module.css';

interface Props {
	children: ReactNode;
}

export const PageContainer = ({ children }: Props) => {
	return <div className={ContainerCSS.container}>{children}</div>;
};

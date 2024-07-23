import { ReactNode } from 'react';
import TableCSS from '../styles/Table.module.css';

interface Props {
	children: ReactNode;
}

export const Cell = ({ children }: Props) => {
	return <div className={TableCSS.cell}>{children}</div>;
};

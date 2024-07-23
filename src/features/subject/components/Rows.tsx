import { ReactNode } from 'react';
import TableCSS from '../styles/Table.module.css';

interface Props {
	children: ReactNode;
}

export const Rows = ({ children }: Props) => {
	return <div className={TableCSS.rows}>{children}</div>;
};

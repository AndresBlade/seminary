import { ReactNode } from 'react';
import TableCSS from '../styles/Table.module.css';

interface Props {
	children: ReactNode;
}

export const TableRow = ({ children }: Props) => {
	return <div className={TableCSS.row}>{children}</div>;
};

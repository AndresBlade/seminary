import { ReactNode } from 'react';
import TableCSS from '../styles/Table.module.css';

interface Props {
	children: ReactNode;
}

export const TableHeaderRow = ({ children }: Props) => {
	return <div className={TableCSS.headers}>{children}</div>;
};

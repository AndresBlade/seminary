import { ReactNode } from 'react';
import TableCSS from '../styles/Table.module.css';
import pointingUpArrow from '../../../assets/MaterialSymbolsArrowDropUp.svg';
import pointingDownArrow from '../../../assets/MaterialSymbolsArrowDropDown.svg';

interface NodeInsideColumn {
	type: 'element';
	children: ReactNode;
}

interface ContentInsideColumn {
	type: 'content';
	content: string[];
}

interface OrderableColumn {
	orderable: true;
	onClick: () => void;
}

interface NotOrderableColumn {
	orderable?: false;
}

type Props = {
	title: string;
} & (NodeInsideColumn | ContentInsideColumn) &
	(OrderableColumn | NotOrderableColumn);

export const TableColumn = (props: Props) => {
	return (
		<div
			className={TableCSS.column}
			onClick={() => {
				if (props.orderable) props.onClick();
			}}
		>
			<div className={TableCSS.header}>
				<p className={TableCSS.headerText}>{props.title}</p>
				{props.orderable && (
					<div className={TableCSS.arrows}>
						<img
							src={pointingUpArrow}
							alt="Ordenar ascendentemente"
							className={TableCSS.arrow}
						/>
						<img
							src={pointingDownArrow}
							alt="Ordenar descendentemente"
							className={TableCSS.arrow}
						/>
					</div>
				)}
			</div>
			{props.type === 'content'
				? props.content.map((content, key) => (
						<div key={key} className={TableCSS.content}>
							<p>{content}</p>
						</div>
				  ))
				: props.children}
		</div>
	);
};

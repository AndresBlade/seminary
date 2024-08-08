import { ReactNode } from 'react';
import TableCSS from '../styles/Table.module.css';
import pointingUpArrow from '../../../assets/MaterialSymbolsArrowDropUp.svg';
import pointingDownArrow from '../../../assets/MaterialSymbolsArrowDropDown.svg';
import { OrderStage } from '../interfaces/OrderStage';

interface NodeInsideColumn {
	type: 'element';
	children: ReactNode;
}

interface ContentInsideColumn {
	type: 'content';
	content: string[];
	classNames?: string[];
}

interface OrderableColumn {
	orderable: true;
	stage: OrderStage;
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
		<div className={TableCSS.column}>
			<div
				className={TableCSS.header}
				onClick={() => {
					if (props.orderable) props.onClick();
				}}
			>
				<p className={TableCSS.headerText}>{props.title}</p>
				{props.orderable ? (
					props.stage === 0 ? (
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
					) : props.stage === 1 ? (
						<div className={TableCSS.arrows}>
							<img
								src={pointingUpArrow}
								alt="Ordenar ascendentemente"
								className={TableCSS.highlightedArrow}
							/>
						</div>
					) : (
						<div className={TableCSS.arrows}>
							<img
								src={pointingDownArrow}
								alt="Ordenar descendentemente"
								className={TableCSS.highlightedArrow}
							/>
						</div>
					)
				) : (
					<></>
				)}
			</div>
			{props.type === 'content'
				? props.content.map((content, index) => (
						<div
							key={index}
							className={
								props.classNames?.[index] ?? TableCSS.cell
							}
						>
							<p>{content}</p>
						</div>
				  ))
				: props.children}
		</div>
	);
};

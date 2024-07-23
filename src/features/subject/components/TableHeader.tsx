import TableCSS from '../styles/Table.module.css';

import pointingUpArrow from '../../../assets/MaterialSymbolsArrowDropUp.svg';
import pointingDownArrow from '../../../assets/MaterialSymbolsArrowDropDown.svg';

interface Orderable {
	orderable: true;
	onClick: () => void;
}

interface NotOrderable {
	orderable?: false;
}

type Props = {
	title: string;
} & (Orderable | NotOrderable);

export const TableHeader = (props: Props) => {
	return (
		<div
			className={TableCSS.header}
			onClick={() => props.orderable && props.onClick()}
		>
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
	);
};

import { LabelProps } from '../interfaces/Period';
import PeriodCSS from '../styles/PeriodCSS.module.css';

const Label = ({ children }: LabelProps) => {
	return <label className={PeriodCSS.labelForm}>{children}</label>;
};

export default Label;

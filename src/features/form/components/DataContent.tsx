import FormCSS from '../styles/FormCSS.module.css';
import { DataContent as DataContentInterface } from '../interfaces/Form';
const DataContent = ({ children, ...DataContent }: DataContentInterface) => {
	return (
		<div className={FormCSS.dataContent} {...DataContent}>
			{children}
		</div>
	);
};

export default DataContent;

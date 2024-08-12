import InstructionCSS from '../styles/Instruction.module.css';
import AddCircleSVG from '../../../assets/MaterialSymbolsAddCircleOutline.svg';

export const AssignButton = () => {
	return (
		<button className={InstructionCSS.assignButton}>
			<img
				src={AddCircleSVG}
				alt="Añadir profesor"
				className={InstructionCSS.assignButtonImg}
			/>
			<p className={InstructionCSS.assignButtonText}>ASIGNAR</p>
		</button>
	);
};

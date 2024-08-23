import InstructionCSS from '../styles/Instruction.module.css';
import AddCircleSVG from '../../../assets/MaterialSymbolsAddCircleOutline.svg';

interface Props {
	handleClick: () => void;
}

export const AssignButton = ({ handleClick }: Props) => {
	return (
		<button onClick={handleClick} className={InstructionCSS.assignButton}>
			<img
				src={AddCircleSVG}
				alt="Añadir profesor"
				className={InstructionCSS.assignButtonImg}
			/>
			<p className={InstructionCSS.assignButtonText}>ASIGNAR</p>
		</button>
	);
};

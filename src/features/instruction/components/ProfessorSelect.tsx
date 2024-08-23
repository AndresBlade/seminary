import { OptionHTMLAttributes } from 'react';
import { SelectFormField } from '../../subject/components/SelectFormField';
import { Professor } from '../interfaces/Professor';
import { Instruction } from '../interfaces/Instruction';
interface Props {
	instruction: Instruction;
	professors: Professor[];
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ProfessorSelect = ({
	instruction,
	professors,
	handleChange,
}: Props) => {
	if (instruction.subject_id === 34) console.log(instruction.professor_id);

	const professorsOptions: OptionHTMLAttributes<HTMLOptionElement>[] =
		professors.map(professor => ({
			content: `${professor.person.forename} ${professor.person.surname}`,
			value: professor.person.id,
		}));

	professorsOptions.unshift({
		content: 'Seleccione un profesor',
		value: 0,
		disabled: true,
	});

	return (
		<SelectFormField
			onSelectChange={handleChange}
			value={
				instruction.professor_id === null
					? professorsOptions[0].value
					: professorsOptions.find(
							option => instruction.professor_id === option.value
					  )?.value
			}
			options={professorsOptions}
		/>
	);
};

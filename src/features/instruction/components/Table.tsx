import { TableColumn } from '../../subject/components/TableColumn';
import { useOrder } from '../../subject/hooks/useOrder';
import { useSubjects } from '../../subject/hooks/useSubjects';
import TableCSS from '../../subject/styles/Table.module.css';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { AssignButton } from './AssignButton';

export const Table = () => {
	const { subjects: subjectsFromDB, setSubjects: setSubjectsFromDB } =
		useSubjects();
	const {
		value: subjects,
		handleOrderChange,
		order,
	} = useOrder({
		value: subjectsFromDB,
		name: 'description',
		setValue: setSubjectsFromDB,
		stage: 1,
	});
	const names = subjects?.map(subject => subject.description);
	return (
		<ContentContainer>
			<div className={TableCSS.table}>
				{names && (
					<TableColumn
						orderable
						title="Materia"
						type="content"
						stage={order.stage}
						content={names}
						onClick={() => handleOrderChange('description')}
					/>
				)}
				{subjects && (
					<TableColumn type="element" title="Profesor">
						{subjects?.map((subject, index) => (
							<div className={TableCSS.cell} key={index}>
								{index === 0 ? (
									'Nicolás Maduro Moros (insertado desde el front)'
								) : (
									<AssignButton />
								)}
							</div>
						))}
					</TableColumn>
				)}
			</div>
		</ContentContainer>
	);
};

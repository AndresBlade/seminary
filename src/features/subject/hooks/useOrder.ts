import { useEffect, useState } from 'react';
import { OrderStage } from '../interfaces/OrderStage';
import { OrderableColumnValues } from '../interfaces/OrderableColumnValues';

interface Props<T> {
	value: T[] | null;
	setValue: React.Dispatch<React.SetStateAction<T[] | null>>;
	name: keyof T;
	stage: OrderStage;
}

export const useOrder = <T>({ value, setValue, name, stage }: Props<T>) => {
	const [order, setOrder] = useState<OrderableColumnValues<T>>({
		name,
		stage,
	});
	const [originalValue, setOriginalValue] = useState<T[] | null>(null);
	const [valueSetToDefault, setValueSetToDefault] = useState(false);

	console.log(value);

	const handleOrderChange = (name: keyof T) => {
		setOrder(order => ({
			name,
			stage: (order.stage !== 2 ? order.stage + 1 : 1) as OrderStage,
		}));
	};

	useEffect(() => {
		if (originalValue) return;
		if (value && valueSetToDefault) setOriginalValue(value);
	}, [value, valueSetToDefault, originalValue]);

	useEffect(() => {
		if (value && !valueSetToDefault) {
			setValue(value => {
				if (!value) return value;
				const valueCopy = [...value];
				valueCopy.sort((a, b) =>
					a[order.name] < b[order.name]
						? -1
						: a[order.name] > b[order.name]
						? 1
						: 0
				);

				return valueCopy;
			});
			setValueSetToDefault(true);
		}
	}, [order.name, setValue, value, valueSetToDefault]);

	return {
		value,
		setValue,
		handleOrderChange,
		order,
		originalValue,
		setValueSetToDefault,
	};
};

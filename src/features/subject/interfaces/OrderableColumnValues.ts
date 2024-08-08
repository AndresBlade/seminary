import { OrderStage } from './OrderStage';

export interface OrderableColumnValues<T> {
	name: keyof T;
	stage: OrderStage;
}

import { OrderStage } from './OrderStage';

export interface OrderableColumnValues {
	name: string | null;
	stage: OrderStage;
}

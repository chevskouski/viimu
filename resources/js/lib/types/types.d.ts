export interface ExpenseCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

export interface ServiceCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

export interface Service {
	id: number;
	service_category_id: number;
	name: string;
	description: string;
	price: number;
	status: boolean;
	service_category?: ServiceCategory;
}

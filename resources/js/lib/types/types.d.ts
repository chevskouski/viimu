import Inventories from "@/Pages/Dashboard/Inventory";

interface BankAccout {
	id: number;
	name: string;
	account_number: string;
	currency: string;
	type: string;
	open_balance: number;
	status: boolean;
}

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

export interface Inventory {
	id: number;
	sku: string;
	type: string;
	name: string;
	description?: string;
	stock: number;
	last_restock_date?: string;
}

export interface InventoryMovement {
	id: number;
	inventory_id: number;
	type: "in" | "out";
	quantity: number;
	movement_date: string;
	notes?: string;
	inventory: Inventory;
}

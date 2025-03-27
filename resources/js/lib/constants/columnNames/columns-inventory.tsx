import { Button } from "@/Components/atoms/button";
import type { Inventory } from "@/lib/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const InventroyTableColumns = (): ColumnDef<Inventory>[] => [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "sku",
		header: "SKU",
	},
	{
		accessorKey: "name",
		header: "NOMBRE",
	},
	{
		accessorKey: "description",
		header: "DESCRIPCIÓN",
	},
	{
		accessorKey: "category",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					CATEGORIA
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "unit",
		header: "UNIDAD",
	},
	{
		accessorKey: "stock",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					STOCK
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "last_restock_date",
		header: "ÚLTIMA FECHA REABASTECIMIENTO",
	},
];

import { Button } from "@/Components/atoms/button";
import type { InventoryMovement } from "@/lib/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoveDown, MoveUp } from "lucide-react";

export const InventoryMovementsTableColumns =
	(): ColumnDef<InventoryMovement>[] => [
		{
			accessorKey: "id",
			header: "ID",
		},
		{
			accessorKey: "inventory.name",
			header: "NOMBRE",
		},
		{
			accessorKey: "inventory.sku",
			header: "SKU",
		},
		{
			accessorKey: "movement_date",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						FECHA
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "type",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						TIPO
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				return row.original.type === "in" ? (
					<span className="flex items-center">
						<MoveDown
							className="dark:text-green-700 text-green-400"
							size={12}
						/>
						Ingreso
					</span>
				) : (
					<span className="flex items-center">
						<MoveUp className="dark:text-red-700 text-red-500" size={12} />
						Salida
					</span>
				);
			},
		},
		{
			accessorKey: "quantity",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						CANTIDAD
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "description",
			header: "DESCRIPCIÓN",
		},
	];

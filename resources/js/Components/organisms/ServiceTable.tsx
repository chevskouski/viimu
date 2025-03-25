import { DataTable } from "@/Components/molecules/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { ArchiveX, ArrowUpDown } from "lucide-react";
import { Button } from "../atoms/button";

interface ServiceCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

interface Service {
	id: number;
	service_category_id: number;
	name: string;
	description: string;
	price: number;
	status: boolean;
	service_category?: ServiceCategory;
}

interface Props {
	services: Service[];
}

export function ServiceTable({ services }: Props) {
	const columns: ColumnDef<Service>[] = [
		{
			accessorKey: "id",
			header: "ID",
		},
		{
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						NOMBRE
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
		},
		{
			accessorKey: "description",
			header: "DESCRIPCIÓN",
		},
		{
			accessorKey: "service_category",
			header: "CATEGORÍA",
			cell: ({ row }) => row.original.service_category?.name,
		},
		{
			accessorKey: "price",
			header: "PRECIO (GTQ)",
			cell: ({ row }) => `Q. ${row.original.price}`,
		},
		{
			accessorKey: "status",
			header: "ESTADO",
			cell: ({ row }) => (row.original.status ? "Activo" : "Inactivo"),
		},
		{
			accessorKey: "action",
			header: "ACCION",
			cell: ({ row }) => {
				return <ArchiveX size={16} />;
			},
		},
	];
	return (
		<div className="container mx-auto">
			<DataTable columns={columns} data={services} />
		</div>
	);
}

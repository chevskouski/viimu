import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import { ExpenseCategoriesForm } from "@/Components/molecules/expense-category-form";
import type { ExpenseCategory } from "@/lib/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArchiveRestore, ArchiveX, ArrowUpDown, Pencil } from "lucide-react";

interface Props {
	areInactiveExpenseCategoriesData?: boolean;
}

export const ExpenseCategoriesTableColumns = ({
	areInactiveExpenseCategoriesData,
}: Props): ColumnDef<ExpenseCategory>[] => [
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
		accessorKey: "status",
		header: "ESTADO",
		cell: ({ row }) => (row.original.status ? "Activo" : "Inactivo"),
	},
	{
		accessorKey: "action",
		header: "ACCIÓN",
		cell: ({ row }) => {
			return (
				<div className="flex gap-4">
					<Dialog>
						<DialogTrigger asChild>
							<Pencil size={16} className="cursor-pointer" />
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Actualiza una Categoría de Gastos</DialogTitle>
								<DialogDescription>
									Personaliza una Categoría de Gastos, poporcionando su nombre y
									descripción.
								</DialogDescription>
							</DialogHeader>
							<ExpenseCategoriesForm
								selectedExpenseCategory={row.original}
								type="Update"
							>
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Cerrar
									</Button>
								</DialogClose>
							</ExpenseCategoriesForm>
						</DialogContent>
					</Dialog>
					{areInactiveExpenseCategoriesData ? (
						<Dialog>
							<DialogTrigger asChild>
								<ArchiveRestore
									size={16}
									className="cursor-pointer text-green-500"
								/>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Restaurar una Categoría de Gastos</DialogTitle>
									<DialogDescription>
										Permite reactivar una categoría que fue archivada o
										deshabilitada previamente. Al restaurarla, esta categoría de
										gasto volverá a estar disponible para su uso con la
										configuración anterior, salvo que se realicen cambios
										adicionales.
									</DialogDescription>
								</DialogHeader>
								<ExpenseCategoriesForm
									selectedExpenseCategory={row.original}
									type="Restore"
								>
									<DialogClose asChild>
										<Button type="button" variant="secondary">
											Cerrar
										</Button>
									</DialogClose>
								</ExpenseCategoriesForm>
							</DialogContent>
						</Dialog>
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<ArchiveX size={16} className="cursor-pointer text-red-500" />
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Dar de Baja una Categoría de Gastos</DialogTitle>
									<DialogDescription>
										Dar de baja servicio implica deshabilitar o desactivar una
										Categoría de Gasto dentro del sistema, evitando que esté
										disponible para su uso o contratación.
									</DialogDescription>
								</DialogHeader>
								<ExpenseCategoriesForm
									selectedExpenseCategory={row.original}
									type="Delete"
								>
									<DialogClose asChild>
										<Button type="button" variant="secondary">
											Cerrar
										</Button>
									</DialogClose>
								</ExpenseCategoriesForm>
							</DialogContent>
						</Dialog>
					)}
				</div>
			);
		},
	},
];

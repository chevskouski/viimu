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
import { BankAccoutForm } from "@/Components/molecules/bank-account-form";
import type { BankAccout } from "@/lib/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArchiveRestore, ArchiveX, ArrowUpDown, Pencil } from "lucide-react";

interface Props {
	areInactiveBankAccountsData?: boolean;
}

export const BankAccountsTableColumns = ({
	areInactiveBankAccountsData,
}: Props): ColumnDef<BankAccout>[] => [
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
		accessorKey: "account_number",
		header: "IDENTIFICADOR",
	},
	{
		accessorKey: "currency",
		header: "MONEDA",
	},
	{
		accessorKey: "type",
		header: "TIPO",
	},
	{
		accessorKey: "open_balance",
		header: "BALANCE",
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
								<DialogTitle>Actualiza una Cuenta Bancaria</DialogTitle>
								<DialogDescription>Personaliza una Cuenta.</DialogDescription>
							</DialogHeader>
							<BankAccoutForm selectedBankAccout={row.original} type="Update">
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Cerrar
									</Button>
								</DialogClose>
							</BankAccoutForm>
						</DialogContent>
					</Dialog>
					{areInactiveBankAccountsData ? (
						<Dialog>
							<DialogTrigger asChild>
								<ArchiveRestore
									size={16}
									className="cursor-pointer text-green-500"
								/>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Restaurar una Cuenta Bancaria</DialogTitle>
									<DialogDescription>
										Permite reactivar una cuenta que fue archivada o
										deshabilitada previamente. Al restaurarla, esta cuenta
										volverá a estar disponible para su uso con la configuración
										anterior, salvo que se realicen cambios adicionales.
									</DialogDescription>
								</DialogHeader>
								<BankAccoutForm
									selectedBankAccout={row.original}
									type="Restore"
								>
									<DialogClose asChild>
										<Button type="button" variant="secondary">
											Cerrar
										</Button>
									</DialogClose>
								</BankAccoutForm>
							</DialogContent>
						</Dialog>
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<ArchiveX size={16} className="cursor-pointer text-red-500" />
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Dar de Baja una Cuenta</DialogTitle>
									<DialogDescription>
										Dar de baja una cuenta implica deshabilitar o desactivar una
										cuenta bancaria dentro del sistema, evitando que esté
										disponible para su uso.
									</DialogDescription>
								</DialogHeader>
								<BankAccoutForm selectedBankAccout={row.original} type="Delete">
									<DialogClose asChild>
										<Button type="button" variant="secondary">
											Cerrar
										</Button>
									</DialogClose>
								</BankAccoutForm>
							</DialogContent>
						</Dialog>
					)}
				</div>
			);
		},
	},
];

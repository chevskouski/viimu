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
import { ServiceForm } from "@/Components/molecules/service-form";
import type { Service, ServiceCategory } from "@/lib/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { ArchiveRestore, ArchiveX, ArrowUpDown, Pencil } from "lucide-react";

interface Props {
	serviceCategories: ServiceCategory[];
	areInactiveServicesData?: boolean;
}

export const ServiceTableColumns = ({
	serviceCategories,
	areInactiveServicesData,
}: Props): ColumnDef<Service>[] => [
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
								<DialogTitle>Actualiza un Servicio</DialogTitle>
								<DialogDescription>
									Personaliza un nuevo servicio a ofrecer. Poporcionando su
									nombre, descripción, precio y categoría específica.
								</DialogDescription>
							</DialogHeader>
							<ServiceForm
								serviceCategories={serviceCategories}
								selectedService={row.original}
								type="Update"
							>
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Cerrar
									</Button>
								</DialogClose>
							</ServiceForm>
						</DialogContent>
					</Dialog>
					{areInactiveServicesData ? (
						<Dialog>
							<DialogTrigger asChild>
								<ArchiveRestore
									size={16}
									className="cursor-pointer text-green-500"
								/>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Restaurar un Servicio</DialogTitle>
									<DialogDescription>
										Permite reactivar un servicio que fue archivado o
										deshabilitado previamente. Al restaurarlo, el servicio
										volverá a estar disponible para su uso con la configuración
										anterior, salvo que se realicen cambios adicionales.
									</DialogDescription>
								</DialogHeader>
								<ServiceForm
									serviceCategories={serviceCategories}
									selectedService={row.original}
									type="Restore"
								>
									<DialogClose asChild>
										<Button type="button" variant="secondary">
											Cerrar
										</Button>
									</DialogClose>
								</ServiceForm>
							</DialogContent>
						</Dialog>
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<ArchiveX size={16} className="cursor-pointer text-red-500" />
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Dar de Baja un Servicio</DialogTitle>
									<DialogDescription>
										Dar de baja servicio implica deshabilitar o desactivar un
										servicio dentro del sistema, evitando que esté disponible
										para su uso o contratación.
									</DialogDescription>
								</DialogHeader>
								<ServiceForm
									serviceCategories={serviceCategories}
									selectedService={row.original}
									type="Delete"
								>
									<DialogClose asChild>
										<Button type="button" variant="secondary">
											Cerrar
										</Button>
									</DialogClose>
								</ServiceForm>
							</DialogContent>
						</Dialog>
					)}
				</div>
			);
		},
	},
];

import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/Components/atoms/select";
import { InventoryForm } from "@/Components/molecules/inventory-form";
import { LastInventoryMovementCard } from "@/Components/molecules/last-inventory-movement-card";
import { InventoryMovementsTable } from "@/Components/organisms/inventory-movements-table";
import { InventoryTable } from "@/Components/organisms/inventory-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { Inventory, InventoryMovement } from "@/lib/types/types";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";
import {
	ArrowDownToLine,
	ArrowUpFromLine,
	NotepadText,
	Plus,
} from "lucide-react";

interface PageProps extends InertiaPageProps {
	inventory: Inventory[];
	inventoryMovement: InventoryMovement[];
	lastInventoryMovements: InventoryMovement[];
}

export default function Inventories() {
	const { inventory, inventoryMovement, lastInventoryMovements } =
		usePage<PageProps>().props;

	const findItemById = (id: number): Inventory | undefined => {
		return inventory.find((item) => item.id === id);
	};

	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<div className="py-0 w-full">
				<div className="space-y-6 sm:px-6 lg:px-8">
					<h1 className="font-semibold text-2xl">Inventario</h1>
					<div className="grid grid-cols-5 gap-6">
						<div>
							<Button className="w-full h-full rounded-xl" variant="secondary">
								<Plus /> Nuevo
							</Button>
						</div>
						<div className="">
							<Dialog>
								<DialogTrigger className="w-full h-full rounded-xl" asChild>
									<Button
										className="w-full h-full rounded-xl"
										variant="secondary"
									>
										<ArrowDownToLine /> Ingreso
									</Button>
								</DialogTrigger>
								<DialogContent aria-describedby={undefined}>
									<DialogHeader>
										<DialogTitle>Añadir STOCK</DialogTitle>
									</DialogHeader>
									<InventoryForm inventory={inventory} movementType="in" />
								</DialogContent>
							</Dialog>
						</div>
						<div className="">
							<Dialog>
								<DialogTrigger className="w-full h-full rounded-xl" asChild>
									<Button
										className="w-full h-full rounded-xl"
										variant="secondary"
									>
										<ArrowUpFromLine /> Salida
									</Button>
								</DialogTrigger>
								<DialogContent aria-describedby={undefined}>
									<DialogHeader>
										<DialogTitle>Despacho de STOCK</DialogTitle>
									</DialogHeader>
									<InventoryForm inventory={inventory} movementType="out" />
								</DialogContent>
							</Dialog>
						</div>
						<div className="row-span-2 col-span-2">
							<LastInventoryMovementCard
								lastInventoryMovements={lastInventoryMovements}
							/>
						</div>
						<div className="col-span-3">
							<Dialog>
								<DialogTrigger className="w-full h-full rounded-xl" asChild>
									<Button className="w-full h-full rounded-xl bg-muted-foreground">
										<NotepadText /> Registro de Movimientos
									</Button>
								</DialogTrigger>
								<DialogContent
									className="max-w-3/4 w-3/4"
									aria-describedby={undefined}
								>
									<DialogHeader>
										<DialogTitle>Registro de Movimientos</DialogTitle>
									</DialogHeader>
									<InventoryMovementsTable
										inventoryMovements={inventoryMovement}
									/>
								</DialogContent>
							</Dialog>
						</div>
					</div>
					<InventoryTable inventory={inventory} />
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import { LastInventoryMovementCard } from "@/Components/molecules/last-inventory-movement-card";
import { InventoryMovementsTable } from "@/Components/organisms/inventory-movements-table";
import { InventoryTable } from "@/Components/organisms/inventory-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { Inventory, InventoryMovement } from "@/lib/types/types";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";
import { ArrowDownToLine, ArrowUpFromLine, NotepadText } from "lucide-react";

interface PageProps extends InertiaPageProps {
	inventory: Inventory[];
	inventoryMovement: InventoryMovement[];
	lastInventoryMovements: InventoryMovement[];
}

export default function Inventories() {
	const { inventory, inventoryMovement, lastInventoryMovements } =
		usePage<PageProps>().props;
	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<div className="py-0 w-full">
				<div className="space-y-6 sm:px-6 lg:px-8">
					<h1 className="font-semibold text-2xl">Inventario</h1>
					<div className="grid grid-cols-3 gap-6">
						<div className="">
							<Button className="w-full h-full rounded-xl" variant="secondary">
								<ArrowDownToLine /> Ingreso
							</Button>
						</div>
						<div className="">
							<Button className="w-full h-full rounded-xl" variant="secondary">
								<ArrowUpFromLine /> Salida
							</Button>
						</div>
						<div className="row-span-2">
							<LastInventoryMovementCard
								lastInventoryMovements={lastInventoryMovements}
							/>
						</div>
						<div className="col-span-2">
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

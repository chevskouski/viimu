import { DataTable } from "@/Components/molecules/data-table";
import { InventoryMovementsTableColumns } from "@/lib/constants/columnNames/columns-inventory-movements";
import type { InventoryMovement } from "@/lib/types/types";

interface Props {
	inventoryMovements: InventoryMovement[];
}

export function InventoryMovementsTable({ inventoryMovements }: Props) {
	const tableColumns = InventoryMovementsTableColumns();
	return (
		<div className="container mx-auto">
			<DataTable
				columns={tableColumns}
				data={inventoryMovements}
				searchColumn="type"
				searchPlaceholder="Busqueda por tipo..."
			/>
		</div>
	);
}

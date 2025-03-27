import { DataTable } from "@/Components/molecules/data-table";
import { InventroyTableColumns } from "@/lib/constants/columnNames/columns-inventory";
import type { Inventory } from "@/lib/types/types";

interface Props {
	inventory: Inventory[];
}

export function InventoryTable({ inventory }: Props) {
	const tableColumns = InventroyTableColumns();
	return (
		<div className="container mx-auto">
			<DataTable columns={tableColumns} data={inventory} />
		</div>
	);
}

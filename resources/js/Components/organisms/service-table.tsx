import { DataTable } from "@/Components/molecules/data-table";
import { ServiceTableColumns } from "@/lib/constants/columns-services";
import type { Service, ServiceCategory } from "@/lib/types/types";

interface Props {
	services: Service[];
	serviceCategories: ServiceCategory[];
	areInactiveServicesData?: boolean;
}

export function ServiceTable({
	services,
	serviceCategories,
	areInactiveServicesData,
}: Props) {
	const tableColumns = ServiceTableColumns({
		serviceCategories,
		areInactiveServicesData,
	});
	return (
		<div className="container mx-auto">
			<DataTable columns={tableColumns} data={services} />
		</div>
	);
}

import { DataTable } from "@/Components/molecules/data-table";
import { ServiceTableColumns } from "@/lib/constants/columns-services";
import type { Service, ServiceCategory } from "@/lib/types/types";

interface Props {
	services: Service[];
	serviceCategories: ServiceCategory[];
}

export function ServiceTable({ services, serviceCategories }: Props) {
	const tableColumns = ServiceTableColumns({ serviceCategories });
	return (
		<div className="container mx-auto">
			<DataTable columns={tableColumns} data={services} />
		</div>
	);
}

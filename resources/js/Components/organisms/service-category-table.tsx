import { DataTable } from "@/Components/molecules/data-table";
import { ServiceCategoryTableColumns } from "@/lib/constants/columns-service-categories";
import type { ServiceCategory } from "@/lib/types/types";

interface Props {
	serviceCategories: ServiceCategory[];
	areInactiveServiceCategoriesData?: boolean;
}

export function ServiceCategoryTable({
	serviceCategories,
	areInactiveServiceCategoriesData,
}: Props) {
	const tableColumns = ServiceCategoryTableColumns({
		areInactiveServiceCategoriesData,
	});
	return (
		<div className="container mx-auto">
			<DataTable columns={tableColumns} data={serviceCategories} />
		</div>
	);
}

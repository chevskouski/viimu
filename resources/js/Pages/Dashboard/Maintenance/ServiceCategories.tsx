import { AddServiceCategory } from "@/Components/molecules/add-service-category";
import { ServiceCategoryTable } from "@/Components/organisms/service-category-table";
import { ViewInactiveServiceCategory } from "@/Components/organisms/view-inactive-category-services";
import { MaintenanceLayout } from "@/Components/templates/maintenance-layout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { ServiceCategory } from "@/lib/types/types";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";

interface PageProps extends InertiaPageProps {
	serviceCategories: ServiceCategory[];
	inactiveServiceCategories: ServiceCategory[];
}

export default function ServiceCategories() {
	const { serviceCategories, inactiveServiceCategories } =
		usePage<PageProps>().props;
	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<MaintenanceLayout
				title="Categorias de Servicios"
				header={
					<>
						<AddServiceCategory />
						<ViewInactiveServiceCategory
							inactiveServiceCategories={inactiveServiceCategories}
						/>
					</>
				}
				content={<ServiceCategoryTable serviceCategories={serviceCategories} />}
			/>
		</AuthenticatedLayout>
	);
}

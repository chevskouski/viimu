import { AddServiceCategory } from "@/Components/molecules/add-service-category";
import { ServiceTable } from "@/Components/organisms/service-table";
import { ViewInactiveServices } from "@/Components/organisms/view-inactive-services";
import { MaintenanceLayout } from "@/Components/templates/maintenance-layout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { ServiceCategory } from "@/lib/types/types";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";

interface PageProps extends InertiaPageProps {
	serviceCategories: ServiceCategory[];
}

export default function ServiceCategories() {
	const { serviceCategories } = usePage<PageProps>().props;
	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<MaintenanceLayout
				title="Categorias de Servicios"
				header={<AddServiceCategory />}
				content={<div>hola</div>}
			/>
		</AuthenticatedLayout>
	);
}

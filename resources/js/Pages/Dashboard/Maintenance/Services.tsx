import { AddService } from "@/Components/molecules/add-service";
import { ServiceTable } from "@/Components/organisms/service-table";
import { ViewInactiveServices } from "@/Components/organisms/view-inactive-services";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { Service, ServiceCategory } from "@/lib/types/types";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";

interface PageProps extends InertiaPageProps {
	services: Service[];
	serviceCategories: ServiceCategory[];
	inactiveServices: Service[];
}

export default function Services() {
	const { services, inactiveServices, serviceCategories } =
		usePage<PageProps>().props;

	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<div className="py-0 w-full">
				<div className="space-y-6 sm:px-6 lg:px-8">
					<h1 className="font-semibold text-2xl">Servicios</h1>
					<div className="flex gap-4">
						<AddService serviceCategories={serviceCategories} />
						<ViewInactiveServices
							inactiveServices={inactiveServices}
							serviceCategories={serviceCategories}
						/>
					</div>
					<ServiceTable
						services={services}
						serviceCategories={serviceCategories}
					/>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

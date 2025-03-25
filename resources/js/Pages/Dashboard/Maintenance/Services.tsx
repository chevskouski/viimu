import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import { ServiceForm } from "@/Components/molecules/service-form";
import { ServiceTable } from "@/Components/organisms/service-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { Service, ServiceCategory } from "@/lib/types/types";
import { type PageProps as InertiaPageProps, router } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";
import { Plus } from "lucide-react";

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
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<Plus /> Nuevo Servicio
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Agrega un nuevo SERVICIO</DialogTitle>
								<DialogDescription>
									Crea y personaliza un nuevo servicio a ofrecer. Poporcionando
									su nombre, descripción, precio y categoría específica.
								</DialogDescription>
							</DialogHeader>
							<ServiceForm serviceCategories={serviceCategories} type="Insert">
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Cerrar
									</Button>
								</DialogClose>
							</ServiceForm>
						</DialogContent>
					</Dialog>
					<ServiceTable
						services={services}
						serviceCategories={serviceCategories}
					/>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

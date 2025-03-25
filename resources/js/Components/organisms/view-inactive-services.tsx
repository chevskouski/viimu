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
import { ServiceTable } from "@/Components/organisms/service-table";
import type { Service, ServiceCategory } from "@/lib/types/types";
import { Archive } from "lucide-react";

interface Props {
	inactiveServices: Service[];
	serviceCategories: ServiceCategory[];
}

export function ViewInactiveServices({
	inactiveServices,
	serviceCategories,
}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<Archive /> Servicios Archivados
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3/4 w-3/4">
				<DialogHeader>
					<DialogTitle>Servicios Archivados o Deshabilitados</DialogTitle>
					<DialogDescription>
						Gestiona los servicios que han sido archivados o deshabilitados
						previamente. En este apartado, podrás reactivar aquellos servicios
						que fueron descontinuados o que no están en funcionamiento en este
						momento.
					</DialogDescription>
				</DialogHeader>
				<ServiceTable
					services={inactiveServices}
					serviceCategories={serviceCategories}
					areInactiveServicesData={true}
				/>
			</DialogContent>
		</Dialog>
	);
}

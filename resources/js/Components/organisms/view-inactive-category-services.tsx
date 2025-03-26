import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import type { ServiceCategory } from "@/lib/types/types";
import { Archive } from "lucide-react";
import { ServiceCategoryTable } from "./service-category-table";

interface Props {
	inactiveServiceCategories: ServiceCategory[];
}

export function ViewInactiveServiceCategory({
	inactiveServiceCategories,
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
				<ServiceCategoryTable
					areInactiveServiceCategoriesData={true}
					serviceCategories={inactiveServiceCategories}
				/>
			</DialogContent>
		</Dialog>
	);
}

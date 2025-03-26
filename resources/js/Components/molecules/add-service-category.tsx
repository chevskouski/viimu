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
import type { ServiceCategory } from "@/lib/types/types";
import { Plus } from "lucide-react";
import { ServiceCategoryForm } from "./service-category-form";

interface Props {
	serviceCategories: ServiceCategory[];
}

export function AddServiceCategory() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus />
					Nueva Categoría de Servicio
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Agrega una nueva Categoría de Servicio</DialogTitle>
					<DialogDescription>
						Crea y personaliza un nueva categoría de servicio a ofrecer.
						Poporcionando su nombre, descripción
					</DialogDescription>
				</DialogHeader>
				<ServiceCategoryForm type="Insert">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cerrar
						</Button>
					</DialogClose>
				</ServiceCategoryForm>
			</DialogContent>
		</Dialog>
	);
}

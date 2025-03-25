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
import type { ServiceCategory } from "@/lib/types/types";
import { Plus } from "lucide-react";

interface Props {
	serviceCategories: ServiceCategory[];
}

export function AddService({ serviceCategories }: Props) {
	return (
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
						Crea y personaliza un nuevo servicio a ofrecer. Poporcionando su
						nombre, descripción, precio y categoría específica.
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
	);
}

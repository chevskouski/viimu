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
import { Plus } from "lucide-react";
import { ExpenseCategoriesForm } from "./expense-categories-form";

export function AddExpenseCategory() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus /> Nueva Categoría de Gasto
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Agrega una nueva Categoría de Gasto</DialogTitle>
					<DialogDescription>
						Crea y personaliza una Categoría de Gasto. Poporcionando su nombre y
						descripción.
					</DialogDescription>
				</DialogHeader>
				<ExpenseCategoriesForm type="Insert">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cerrar
						</Button>
					</DialogClose>
				</ExpenseCategoriesForm>
			</DialogContent>
		</Dialog>
	);
}

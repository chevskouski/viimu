import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import type { ExpenseCategory } from "@/lib/types/types";
import { Archive } from "lucide-react";
import { ExpenseCategoriesTable } from "./expense-categories-table";

interface Props {
	inactiveExpenseCategories: ExpenseCategory[];
}

export function ViewInactiveExpenseCategories({
	inactiveExpenseCategories,
}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<Archive /> Categorías de Gasto Archivadas
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3/4 w-3/4">
				<DialogHeader>
					<DialogTitle>
						Categorías de Gasto Archivadas o Deshabilitadas
					</DialogTitle>
					<DialogDescription>
						Gestiona las Categorías de Gasto que han sido archivadas o
						deshabilitadas previamente. En este apartado, podrás reactivar
						aquellas Categorías que fueron descontinuados o que no están en
						funcionamiento en este momento.
					</DialogDescription>
				</DialogHeader>

				<ExpenseCategoriesTable
					areInactiveExpenseCategoriesData={true}
					expenseCategory={inactiveExpenseCategories}
				/>
			</DialogContent>
		</Dialog>
	);
}

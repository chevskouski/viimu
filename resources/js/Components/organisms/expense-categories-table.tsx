import { DataTable } from "@/Components/molecules/data-table";
import { ExpenseCategoriesTableColumns } from "@/lib/constants/columns-expense-categories";
import type { ExpenseCategory } from "@/lib/types/types";

interface Props {
	expenseCategory: ExpenseCategory[];
	areInactiveExpenseCategoriesData?: boolean;
}

export function ExpenseCategoriesTable({
	expenseCategory,
	areInactiveExpenseCategoriesData,
}: Props) {
	const tableColumns = ExpenseCategoriesTableColumns({
		areInactiveExpenseCategoriesData,
	});
	return (
		<div className="container mx-auto">
			<DataTable columns={tableColumns} data={expenseCategory} />
		</div>
	);
}

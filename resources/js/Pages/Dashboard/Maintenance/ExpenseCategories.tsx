import { AddExpenseCategory } from "@/Components/molecules/add-expense-category";
import { ExpenseCategoriesTable } from "@/Components/organisms/expense-categories-table";
import { ViewInactiveExpenseCategories } from "@/Components/organisms/view-inactive-expense-categories";
import { MaintenanceLayout } from "@/Components/templates/maintenance-layout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { ExpenseCategory } from "@/lib/types/types";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";

interface PageProps extends InertiaPageProps {
	expenseCategories: ExpenseCategory[];
	inactiveExpenseCategories: ExpenseCategory[];
}

export default function ExpenseCategories() {
	const { expenseCategories, inactiveExpenseCategories } =
		usePage<PageProps>().props;
	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<MaintenanceLayout
				title="Categorias de Servicios"
				header={
					<>
						<AddExpenseCategory />
						<ViewInactiveExpenseCategories
							inactiveExpenseCategories={inactiveExpenseCategories}
						/>
					</>
				}
				content={<ExpenseCategoriesTable expenseCategory={expenseCategories} />}
			/>
		</AuthenticatedLayout>
	);
}

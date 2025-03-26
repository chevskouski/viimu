import { AddBankAccount } from "@/Components/molecules/add-bank-account";
import { BankAccountsTable } from "@/Components/organisms/bank-accounts-table";
import { ViewInactiveBankAccounts } from "@/Components/organisms/view-inactive-bank-accouts";
import { MaintenanceLayout } from "@/Components/templates/maintenance-layout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { BankAccout } from "@/lib/types/types";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";

interface PageProps extends InertiaPageProps {
	bankAccounts: BankAccout[];
	inactiveBankAccounts: BankAccout[];
}

export default function BankAcounts() {
	const { bankAccounts, inactiveBankAccounts } = usePage<PageProps>().props;
	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<MaintenanceLayout
				title="Cuentas Bancarias"
				header={
					<>
						<AddBankAccount />
						<ViewInactiveBankAccounts
							inactiveBankAccounts={inactiveBankAccounts}
						/>
					</>
				}
				content={<BankAccountsTable bankAccout={bankAccounts} />}
			/>
		</AuthenticatedLayout>
	);
}

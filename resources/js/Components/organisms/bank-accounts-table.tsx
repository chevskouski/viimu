import { DataTable } from "@/Components/molecules/data-table";
import { BankAccountsTableColumns } from "@/lib/constants/columns-bank-accounts";
import type { BankAccout } from "@/lib/types/types";

interface Props {
	bankAccout: BankAccout[];
	areInactiveBankAccountsData?: boolean;
}

export function BankAccountsTable({
	bankAccout,
	areInactiveBankAccountsData,
}: Props) {
	const tableColumns = BankAccountsTableColumns({
		areInactiveBankAccountsData,
	});
	return (
		<div className="container mx-auto">
			<DataTable columns={tableColumns} data={bankAccout} />
		</div>
	);
}

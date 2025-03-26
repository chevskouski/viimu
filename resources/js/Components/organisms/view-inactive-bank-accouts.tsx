import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import type { BankAccout } from "@/lib/types/types";
import { Archive } from "lucide-react";
import { BankAccountsTable } from "./bank-accounts-table";

interface Props {
	inactiveBankAccounts: BankAccout[];
}

export function ViewInactiveBankAccounts({ inactiveBankAccounts }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<Archive /> Cuentas Archivadas
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3/4 w-3/4">
				<DialogHeader>
					<DialogTitle>Cuentas Archivadas o Deshabilitadas</DialogTitle>
					<DialogDescription>
						Gestiona las Cuentas que han sido archivadas o deshabilitadas
						previamente. En este apartado, podrás reactivar aquellas Cuentas que
						fueron descontinuadas o que no están en funcionamiento en este
						momento.
					</DialogDescription>
				</DialogHeader>

				<BankAccountsTable
					areInactiveBankAccountsData={true}
					bankAccout={inactiveBankAccounts}
				/>
			</DialogContent>
		</Dialog>
	);
}

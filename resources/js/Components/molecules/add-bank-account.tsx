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
import { BankAccoutForm } from "./bank-account-form";

export function AddBankAccount() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus /> Nueva Cuenta
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Agrega una nueva Cuenta</DialogTitle>
					<DialogDescription>
						Crea una cuenta Poporcionando su nombre, identificador, moneda, tipo
						de cuenta y balance inicial.
					</DialogDescription>
				</DialogHeader>
				<BankAccoutForm type="Insert">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cerrar
						</Button>
					</DialogClose>
				</BankAccoutForm>
			</DialogContent>
		</Dialog>
	);
}

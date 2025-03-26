import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/Components/atoms/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/Components/atoms/select";
import { useMaintenanceCrud } from "@/hooks/use-maintenance-crud";
import type { BankAccout } from "@/lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";

const btnTitles: Record<string, string> = {
	Delete: "Archivar",
	Update: "Actualizar",
	Insert: "Ingresar",
	Restore: "Restaurar",
};

interface Props {
	selectedBankAccout?: BankAccout;
	children?: React.ReactNode;
	type: "Insert" | "Update" | "Delete" | "Restore";
}

export function BankAccoutForm({ selectedBankAccout, children, type }: Props) {
	//validaciones del formulario [zod]
	const formSchema = z.object({
		id: z.number().optional(),
		name: z
			.string()
			.max(75, {
				message: "El nombre no puede tener más de 75 caracteres",
			})
			.min(1, {
				message: "El campo nombre es obligatorio.",
			}),
		account_number: z.string().max(124, {
			message:
				"La identificación de la cuenta no puede tener más de 124 caracteres.",
		}),
		currency: z.string().max(75, {
			message: "El tipo de Moneda es un campo obligatorio.",
		}),
		type: z.string().max(75, {
			message: "El tipo de Cuenta es un campo obligatorio.",
		}),
		open_balance: z.coerce.number(),
		status: z.coerce.boolean(),
	});

	//Inicializar el formulario
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: selectedBankAccout || {
			id: 0,
			name: "",
			account_number: "",
			currency: "GTQ",
			type: "",
			open_balance: 0.0,
			status: true,
		},
	});

	// Manejo del Submit
	const routePrefix = "dashboard.maintenance.bank-accounts";
	const { onSubmitInsert, onSubmitUpdate } = useMaintenanceCrud(
		formSchema,
		routePrefix,
	);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		let submitFunction = onSubmitInsert;

		if (type === "Update" && selectedBankAccout) {
			submitFunction = (data) => onSubmitUpdate(data, selectedBankAccout.id);
		} else if (type === "Delete" && selectedBankAccout) {
			submitFunction = (data) => {
				data.status = false;
				onSubmitUpdate(data, selectedBankAccout.id);
			};
		} else if (type === "Restore" && selectedBankAccout) {
			submitFunction = (data) => {
				data.status = true;
				onSubmitUpdate(data, selectedBankAccout.id);
			};
		}

		form.handleSubmit(submitFunction)(e);
	};

	// Propiedades del form
	const isDisabled = type === "Delete" || type === "Restore";
	const btnTitle = btnTitles[type];
	const btnVariant = type === "Delete" ? "destructive" : "default";
	const currencies = ["GTQ", "USD", "EUR"] as const;
	const types = ["savings", "monetary"] as const;

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input
									disabled={isDisabled}
									placeholder="Ingrese el nombre"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="account_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Numero Identificador</FormLabel>
							<FormControl>
								<Input
									disabled={isDisabled}
									placeholder="Ingrese el identificador para la cuenta"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Numero Identificador</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => field.onChange(value)}
									value={field.value ? String(field.value) : ""}
									disabled={isDisabled}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tipo de Cuenta" />
									</SelectTrigger>
									<SelectContent>
										{types.map((type) => (
											<SelectItem key={type} value={type}>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="currency"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Moneda</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => field.onChange(value)}
									value={field.value ? String(field.value) : ""}
									disabled={isDisabled}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tipo de Cuenta" />
									</SelectTrigger>
									<SelectContent>
										{currencies.map((currency) => (
											<SelectItem key={currency} value={currency}>
												{currency}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="open_balance"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Balance Inicial</FormLabel>
							<FormControl>
								<Input
									type="number"
									disabled={isDisabled}
									placeholder="Ingrese el balance inicial"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end gap-2">
					{children}
					<Button type="submit" variant={btnVariant}>
						{btnTitle}
					</Button>
				</div>
			</form>
		</Form>
	);
}

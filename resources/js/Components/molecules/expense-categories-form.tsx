import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/Components/atoms/form";
import { useMaintenanceCrud } from "@/hooks/use-maintenance-crud";
import type { ExpenseCategory } from "@/lib/types/types";
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
	selectedExpenseCategory?: ExpenseCategory;
	children?: React.ReactNode;
	type: "Insert" | "Update" | "Delete" | "Restore";
}

export function ExpenseCategoriesForm({
	selectedExpenseCategory,
	children,
	type,
}: Props) {
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
		description: z
			.string()
			.max(255, {
				message: "La descripción no puede tener más de 255 caracteres.",
			})
			.optional(),
		status: z.coerce.boolean(),
	});

	//Inicializar el formulario
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: selectedExpenseCategory || {
			id: 0,
			name: "",
			description: "",
			status: true,
		},
	});

	// Manejo del Submit
	const routePrefix = "dashboard.maintenance.expense-categories";
	const { onSubmitInsert, onSubmitUpdate } = useMaintenanceCrud(
		formSchema,
		routePrefix,
	);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		let submitFunction = onSubmitInsert;

		if (type === "Update" && selectedExpenseCategory) {
			submitFunction = (data) =>
				onSubmitUpdate(data, selectedExpenseCategory.id);
		} else if (type === "Delete" && selectedExpenseCategory) {
			submitFunction = (data) => {
				data.status = false;
				onSubmitUpdate(data, selectedExpenseCategory.id);
			};
		} else if (type === "Restore" && selectedExpenseCategory) {
			submitFunction = (data) => {
				data.status = true;
				onSubmitUpdate(data, selectedExpenseCategory.id);
			};
		}

		form.handleSubmit(submitFunction)(e);
	};

	// Propiedades del form
	const isDisabled = type === "Delete" || type === "Restore";
	const btnTitle = btnTitles[type];
	const btnVariant = type === "Delete" ? "destructive" : "default";

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
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripción</FormLabel>
							<FormControl>
								<Input
									disabled={isDisabled}
									placeholder="Ingrese la descripción del servicio"
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

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
import type { Service, ServiceCategory } from "@/lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
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
	selectedService?: Service;
	children?: React.ReactNode;
	type: "Insert" | "Update" | "Delete" | "Restore";
}

export function ServiceCategoryForm({
	selectedService,
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
		defaultValues: selectedService || {
			id: 0,
			name: "",
			description: "",
			status: true,
		},
	});

	// Manejo del Submit
	const routePrefix = "dashboard.maintenance.service-categories";
	const { onSubmitInsert, onSubmitUpdate } = useMaintenanceCrud(
		formSchema,
		routePrefix,
	);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		let submitFunction = onSubmitInsert;

		if (type === "Update" && selectedService) {
			submitFunction = (data) => onSubmitUpdate(data, selectedService.id);
		} else if (type === "Delete" && selectedService) {
			submitFunction = (data) => {
				data.status = false;
				onSubmitUpdate(data, selectedService.id);
			};
		} else if (type === "Restore" && selectedService) {
			submitFunction = (data) => {
				data.status = true;
				onSubmitUpdate(data, selectedService.id);
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

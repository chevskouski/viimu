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
import type { Inventory } from "@/lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";

const btnTitles: Record<string, string> = {
	in: "Añadir",
	out: "Despachar",
};

interface Props {
	inventory: Inventory[];
	children?: React.ReactNode;
	movementType: "in" | "out";
}

export function InventoryForm({ inventory, children, movementType }: Props) {
	//validaciones del formulario [zod]
	const formSchema = z.object({
		id: z.coerce.number(),
		type: z.string().max(3, {
			message: "ERROR TIPO DE TRANSACCION",
		}),
		description: z.string().max(255, {
			message: "La descripción no puede tener más de 255 caracteres.",
		}),
		quantity: z.coerce.number().min(1, {
			message: "La cantidad debe ser mayor a cero(0).",
		}),
	});

	//Inicializar el formulario
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: 0,
			type: movementType,
			description: "",
			quantity: 0,
		},
	});

	// Manejo del Submit
	const routePrefix = "dashboard.inventory";
	const { onSubmitInsert } = useMaintenanceCrud(formSchema, routePrefix);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		form.handleSubmit(onSubmitInsert)(e);
	};

	// Propiedades del form
	const btnTitle = btnTitles[movementType];
	const btnVariant = movementType === "out" ? "destructive" : "default";

	// SELECT
	const selectedItemId = form.watch("id");
	const selectedItem = inventory.find((item) => item.id === selectedItemId);

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Item</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => field.onChange(Number(value))}
									value={field.value ? String(field.value) : ""}
								>
									<SelectTrigger>
										<SelectValue placeholder="Seleccionar item" />
									</SelectTrigger>
									<SelectContent>
										{inventory.map((item) => (
											<SelectItem key={item.id} value={String(item.id)}>
												{item.name} | SKU: {item.sku}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Línea dinámica con SKU y cantidad */}
				{selectedItem && (
					<div className="text-sm text-foreground">
						<p>
							<strong>Cantidad Actual:</strong> {selectedItem.stock} de{" "}
							{selectedItem.unit}
						</p>
						<p>
							<strong>Categoria:</strong> {selectedItem.category}
						</p>
						<p>
							<strong>SKU:</strong> {selectedItem.sku}
						</p>
					</div>
				)}

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripción</FormLabel>
							<FormControl>
								<Input
									placeholder={`Ingrese el motivo/descripción del ${movementType === "in" ? "Ingreso" : "Despacho"}`}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="quantity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cantidad</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Ingrese la cantidad"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
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

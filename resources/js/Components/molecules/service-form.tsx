import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/Components/atoms/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/Components/atoms/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/core";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";

interface ServiceCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

interface Props {
	serviceCategories: ServiceCategory[];
	children?: React.ReactNode;
	type: string;
}

export function ServiceForm({ serviceCategories, children, type }: Props) {
	//validaciones del formulario [zod]
	const formSchema = z.object({
		name: z.string().min(2, {
			message: "El nombre debe tener al menos 2 caracteres",
		}),
		description: z.string().min(5, {
			message: "La descripción debe tener al menos 5 caracteres.",
		}),
		service_category_id: z.number().min(1, {
			message: "Seleccione una categoría.",
		}),
		price: z.number().min(1, {
			message: "Ingrese un precio.",
		}),
		status: z.boolean().default(true),
	});

	//Inicializar el formulario
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			service_category_id: 0,
			price: 0.0,
			status: true,
		},
	});

	function onSubmitInsert(values: z.infer<typeof formSchema>) {
		router.post(route("dashboard.maintenance.services.store"), values, {
			onSuccess: (page) => {
				const flash = page.props.flash as Record<string, unknown>;
				if (flash && "success" in flash) {
					toast.success(String(flash.success));
				}
			},
			onError: (errors) => {
				if (errors.error) {
					toast.error(String(errors.error));
				}
			},
		});
	}

	function onSubmitUpdate(values: z.infer<typeof formSchema>, id: number) {
		router.patch(
			route("dashboard.maintenance.services.update", { service: id }),
			values,
			{
				onSuccess: (page) => {
					const flash = page.props.flash as Record<string, unknown>;
					if (flash && "success" in flash) {
						toast.success(String(flash.success));
					}
					form.reset();
				},
				onError: (errors) => {
					if (errors.error) {
						toast.error(String(errors.error));
					}
				},
			},
		);
		//console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmitInsert)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input placeholder="Ingrese el nombre" {...field} />
							</FormControl>
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
									placeholder="Ingrese la descripción del servicio"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="service_category_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categoría del Servicio</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => field.onChange(Number(value))}
									value={field.value ? String(field.value) : ""}
								>
									<SelectTrigger>
										<SelectValue placeholder="Seleccione una categoría" />
									</SelectTrigger>
									<SelectContent>
										{serviceCategories.map((serviceCategory) => (
											<SelectItem
												key={serviceCategory.id}
												value={String(serviceCategory.id)}
											>
												{serviceCategory.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Precio (Q.)</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Ingrese la descripcion del servicio"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex justify-end gap-2">
					{children}
					<Button type="submit"> Ingresar </Button>
				</div>
			</form>
		</Form>
	);
}

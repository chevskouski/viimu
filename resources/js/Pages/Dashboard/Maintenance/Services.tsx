import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/Components/atoms/form";
import { Input } from "@/Components/atoms/input";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
} from "@/Components/atoms/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/Components/atoms/select";
import { Switch } from "@/Components/atoms/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/atoms/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { type PageProps as InertiaPageProps, router } from "@inertiajs/core";
import { Head, usePage } from "@inertiajs/react";
import { ClipboardPenLine, EyeOff, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { ServiceForm } from "@/Components/molecules/service-form";
import { ServiceTable } from "@/Components/organisms/ServiceTable";

interface ServiceCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

interface Service {
	id: number;
	service_category_id: number;
	name: string;
	description: string;
	price: number;
	status: boolean;
	service_category?: ServiceCategory;
}

interface PaginationData<T> {
	data: T[];
	links: { url: string | null; label: string; active: boolean }[];
}

interface PageProps extends InertiaPageProps {
	services: PaginationData<Service>;
	serviceCategories: ServiceCategory[];
	inactiveServices: Service[];
}

export default function Services() {
	const { services, inactiveServices, serviceCategories } =
		usePage<PageProps>().props;

	const formartLinkLabel = (label: string): string => {
		return label.replace(/&laquo;|&raquo;/g, "");
	};

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

	// Submit
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

	const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
	const [deletingServiceId, setDeletingServiceId] = useState<number | null>(
		null,
	);

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
					setEditingServiceId(null);
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

	const columnNames = [
		"ID",
		"NOMBRE",
		"DESCRIPCIÓN",
		"CATEGORÍA",
		"PRECIO (Q.)",
		"ESTADO",
		"ACCIONES",
	];

	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<div className="py-0 w-full">
				<div className="space-y-6 sm:px-6 lg:px-8">
					<h1 className="font-semibold text-2xl">Servicios</h1>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								onClick={() => {
									form.reset({
										name: "",
										description: "",
										service_category_id: 0,
										price: 0.0,
										status: true,
									});
								}}
							>
								<Plus /> Nuevo Servicio
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Agrega un nuevo SERVICIO</DialogTitle>
								<DialogDescription>
									Crea y personaliza un nuevo servicio a ofrecer. Poporcionando
									su nombre, descripción, precio y categoría específica.
								</DialogDescription>
							</DialogHeader>
							<ServiceForm serviceCategories={serviceCategories} type="insert">
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Cerrar
									</Button>
								</DialogClose>
							</ServiceForm>
						</DialogContent>
					</Dialog>
					<ServiceTable services={services.data} />
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

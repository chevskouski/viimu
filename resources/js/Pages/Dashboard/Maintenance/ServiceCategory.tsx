import { AddItemModal } from "@/Components/AddItemModal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/Components/ui/pagination";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface ServiceCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

export default function ServiceCategory() {
	// Obtenemos las categorías de servicios
	const {
		categories = { data: [], links: [], current_page: 1, last_page: 1 },
		flash,
	} = usePage().props as unknown as {
		categories: {
			data: ServiceCategory[];
			links: { url: string | null; label: string; active: boolean }[];
			current_page: number;
			last_page: number;
		};
		flash?: { success?: string; error?: string };
	};

	//Manejar paginación
	const handlePageChange = (url: string | null) => {
		if (url) {
			router.visit(url);
		}
	};

	const formatLinkLabel = (label: string): string => {
		return label.replace(/&laquo;|&raquo;/g, "");
	};

	const pageLinks = categories.links.filter(
		(link) =>
			!link.label.includes("&laquo;") && !link.label.includes("&raquo;"),
	);
	const prevLink = categories.links.find((link) =>
		link.label.includes("&laquo;"),
	);

	const nextLink = categories.links.find((link) =>
		link.label.includes("&raquo;"),
	);

	// Mostrar mensajes flash
	useEffect(() => {
		if (flash?.success) toast.success(flash.success);
		if (flash?.error) toast.error(flash.error);
	}, [flash]);

	// Agregar un nuevo servicio
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		description: "",
		status: true,
	});

	const handleSubmitNewService = () => {
		post(route("dashboard.maintenance.service-category.store"), {
			preserveScroll: true,
			onSuccess: () => reset(),
		});
	};

	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<div className="py-0 w-full">
				<div className="space-y-6 sm:px-6 lg:px-8">
					<h1 className="font-semibold text-2xl">Tipos de Servicios</h1>

					{/* Modal para agregar un nuevo servicio */}
					<AddItemModal
						title="Agregar Servicio"
						triggerTitle="Agregar Servicio"
						description="Agrega un nuevo tipo de servicio proporcionando su nombre y una breve descripción."
						onSubmit={handleSubmitNewService}
						processing={processing}
					>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Nombre
								</Label>
								<Input
									id="name"
									type="text"
									className="col-span-3"
									value={data.name}
									onChange={(e) => setData("name", e.target.value)}
									maxLength={75}
									required
								/>
								{errors.name && (
									<p className="text-red-500 text-sm col-span-3 col-start-2">
										{errors.name}
									</p>
								)}
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="description" className="text-right">
									Descripción
								</Label>
								<Input
									id="description"
									type="text"
									className="col-span-3"
									value={data.description}
									onChange={(e) => setData("description", e.target.value)}
									maxLength={255}
								/>
								{errors.description && (
									<p className="text-red-500 text-sm col-span-3 col-start-2">
										{errors.description}
									</p>
								)}
							</div>
						</div>
					</AddItemModal>

					{/* Tabla de categorías de servicio */}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>
								<TableHead className="w-1/4">Nombre</TableHead>
								<TableHead className="w-full">Descripción</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead className="text-center">Acción</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories.data.length > 0 ? (
								categories.data.map((category) => (
									<TableRow key={category.id}>
										<TableCell className="font-medium">{category.id}</TableCell>
										<TableCell>{category.name}</TableCell>
										<TableCell>
											{category.description || "Sin descripción"}
										</TableCell>
										<TableCell>
											{category.status ? "Activo" : "Inactivo"}
										</TableCell>
										<TableCell className="flex gap-2">
											<Button variant="outline">
												<Pencil size={16} /> Editar
											</Button>
											<Button variant="destructive">
												<Trash2 size={16} /> Eliminar
											</Button>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} className="text-center">
										No hay categorías disponibles.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
					{/* Componente de paginación */}
					{categories.last_page > 1 && (
						<div className="flex justify-center mt-4">
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											label="Anterior"
											href="#"
											onClick={(e) => {
												e.preventDefault();
												handlePageChange(prevLink?.url || null);
											}}
											className={
												!prevLink?.url
													? "pointer-events-none opacity-50"
													: "cursor-pointer"
											}
										/>
									</PaginationItem>
									{pageLinks.map((link) => (
										<PaginationItem key={link.label}>
											<PaginationLink
												href="#"
												onClick={(e) => {
													e.preventDefault();
													handlePageChange(link.url);
												}}
												isActive={link.active}
											>
												{formatLinkLabel(link.label)}
											</PaginationLink>
										</PaginationItem>
									))}
									<PaginationItem>
										<PaginationNext
											label="Siguiente"
											href="#"
											onClick={(e) => {
												e.preventDefault();
												handlePageChange(nextLink?.url || null);
											}}
											className={
												!nextLink?.url
													? "pointer-events-none opacity-50"
													: "cursor-pointer"
											}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					)}
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

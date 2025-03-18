import { AddItemModal } from "@/Components/AddItemModal";
import { EditItemModal } from "@/Components/EditItemModal";
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
import { Switch } from "@/Components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ExpenseCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

export default function ExpenseCategory() {
	const {
		categories = { data: [], links: [], current_page: 1, last_page: 1 },
		flash,
	} = usePage().props as unknown as {
		categories: {
			data: ExpenseCategory[];
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

	// Agregar
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		description: "",
		status: true,
	});

	const handleSubmitNewExpense = () => {
		post(route("dashboard.maintenance.expense-category.store"), {
			preserveScroll: true,
			onSuccess: () => reset(),
		});
	};

	// Eliminar una categoría
	const handleDeleteCategory = (id: number) => {
		if (
			confirm(
				"¿Estás seguro de que quieres eliminar esta categoría? Esto eliminara todos los gastos asociados a esta categoría. Esta acción no se puede deshacer. Si unicamente deseas dar de baja la categoría, puedes hacerlo desde la opción de editar.",
			)
		) {
			router.delete(
				route("dashboard.maintenance.expense-category.destroy", {
					expenseCategory: id,
				}),
			);
		}
	};

	// Actualizar Item
	const [editingCategory, setEditingCategory] =
		useState<ExpenseCategory | null>(null);
	const editForm = useForm<{
		name: string;
		description: string;
		status: boolean;
	}>({
		name: "",
		description: "",
		status: true,
	});

	const initializeEditForm = (category: ExpenseCategory) => {
		setEditingCategory(category);
		editForm.setData({
			name: category.name,
			description: category.description || "",
			status: category.status,
		});
	};

	const handleSubmitEditExpense = () => {
		if (!editingCategory) return;

		editForm.patch(
			route("dashboard.maintenance.expense-category.update", {
				expenseCategory: editingCategory.id,
			}),
			{
				preserveScroll: true,
				onSuccess: () => {
					setEditingCategory(null);
					editForm.reset();
				},
			},
		);
	};
	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<div className="py-0 w-full">
				<div className="space-y-6 sm:px-6 lg:px-8">
					<h1 className="font-semibold text-2xl">Categorías de Gastos</h1>

					<AddItemModal
						title="Agregar Categoría de Gasto"
						triggerTitle="Categoría de Gasto"
						description="Agrega una nueva categoría de gasto proporcionando su nombre y una breve descripción."
						onSubmit={handleSubmitNewExpense}
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

							<div className="grid grid-cols-4 gap-4">
								<Label htmlFor="description" className="text-right mt-2">
									Descripción
								</Label>
								<Textarea
									id="description"
									className="col-span-3 h-32"
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
											{/* Modal para editar una categoria de servicio */}
											<EditItemModal
												title="Editar - Categoria de Servicio"
												triggerTitle="Editar"
												description="Edita esta categoria de servicio modificando ya sea su nombre y/o descripción. O da de baja esta categoria si ya no es necesaria actualizando su estado."
												onSubmit={handleSubmitEditExpense}
												processing={editForm.processing}
												onTriggerClick={() => initializeEditForm(category)}
											>
												<div className="grid gap-4 py-4">
													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="edit-name" className="text-right">
															Nombre
														</Label>
														<Input
															id="edit-name"
															type="text"
															className="col-span-3"
															value={editForm.data.name}
															onChange={(e) =>
																editForm.setData("name", e.target.value)
															}
															maxLength={75}
															required
														/>
														{editForm.errors.name && (
															<p className="text-red-500 text-sm col-span-3 col-start-2">
																{editForm.errors.name}
															</p>
														)}
													</div>

													<div className="grid grid-cols-4 gap-4">
														<Label
															htmlFor="edit-description"
															className="text-right mt-2"
														>
															Descripción
														</Label>
														<Textarea
															id="edit-description"
															value={editForm.data.description}
															maxLength={255}
															className="col-span-3 h-32"
															onChange={(e) =>
																editForm.setData("description", e.target.value)
															}
														/>
														{editForm.errors.description && (
															<p className="text-red-500 text-sm col-span-3 col-start-2">
																{editForm.errors.description}
															</p>
														)}
													</div>
													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="edit-status" className="text-right">
															Estado
														</Label>
														<Switch
															id="edit-status"
															checked={editForm.data.status}
															onCheckedChange={(checked) =>
																editForm.setData("status", checked)
															}
														/>
													</div>
												</div>
											</EditItemModal>
											<Button
												variant="destructive"
												onClick={() => handleDeleteCategory(category.id)}
											>
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

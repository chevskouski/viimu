import { AddItemModal } from "@/Components/AddItemModal";
import { EditItemModal } from "@/Components/EditItemModal";
import { TablePagination } from "@/Components/TablePagination";
import { Button } from "@/Components/atoms/button";
import { Input } from "@/Components/atoms/input";
import { Label } from "@/Components/atoms/label";
import { Switch } from "@/Components/atoms/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/atoms/table";
import { Textarea } from "@/Components/atoms/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useDeleteData } from "@/hooks/use-delete-data";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useInsertData } from "@/hooks/use-insert-data";
import { useUpdateData } from "@/hooks/use-update-data";
import { Head } from "@inertiajs/react";
import { Loader2, Trash2 } from "lucide-react";

interface ExpenseCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

export default function ExpenseCategory() {
	const currentRoute = "dashboard.maintenance.expense-category";

	const { categories, flash } = useFetchData<ExpenseCategory>();

	const { data, setData, insertData, processing, errors } = useInsertData(
		currentRoute,
		{
			name: "",
			description: "",
			status: true,
		},
	);

	const {
		editData,
		setEditData,
		editErrors,
		updating,
		initializeForm,
		updateData,
	} = useUpdateData({
		name: "",
		description: "",
		status: true,
	});

	const { deleteData, isDeleting } = useDeleteData();

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
						onSubmit={insertData}
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
												onSubmit={updateData(currentRoute, {
													id: category.id,
												})}
												processing={updating}
												onTriggerClick={() => initializeForm(category)}
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
															value={editData.name}
															onChange={(e) =>
																setEditData("name", e.target.value)
															}
															maxLength={75}
															required
														/>
														{editErrors.name && (
															<p className="text-red-500 text-sm col-span-3 col-start-2">
																{editErrors.name}
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
															value={editData.description}
															maxLength={255}
															className="col-span-3 h-32"
															onChange={(e) =>
																setEditData("description", e.target.value)
															}
														/>
														{editErrors.description && (
															<p className="text-red-500 text-sm col-span-3 col-start-2">
																{editErrors.description}
															</p>
														)}
													</div>
													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="edit-status" className="text-right">
															Estado
														</Label>
														<Switch
															id="edit-status"
															checked={editData.status}
															onCheckedChange={(checked) =>
																setEditData("status", checked)
															}
														/>
													</div>
												</div>
											</EditItemModal>
											{/* Eliminar Registro */}
											<Button
												variant="destructive"
												id={`btn-delete-${category.id}`}
												disabled={isDeleting(category.id)}
												onClick={() =>
													deleteData(
														category.id,
														currentRoute,
														"¿Estás seguro de que quieres eliminar esta categoría? Esto eliminará todos los servicios asociados a esta categoría.",
													)
												}
											>
												{isDeleting(category.id) ? (
													<Loader2 className="animate-spin" />
												) : (
													<Trash2 size={16} />
												)}
												{isDeleting(category.id) ? "Eliminar" : "Eliminar"}
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
							<TablePagination
								links={categories.links}
								lastPage={categories.last_page}
							/>
						</div>
					)}
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

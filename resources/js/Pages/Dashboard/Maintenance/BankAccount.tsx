import { AddItemModal } from "@/Components/AddItemModal";
import { EditItemModal } from "@/Components/EditItemModal";
import { TablePagination } from "@/Components/TablePagination";
import { Button } from "@/Components/atoms/button";
import { Input } from "@/Components/atoms/input";
import { Label } from "@/Components/atoms/label";
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
import { useDeleteData } from "@/hooks/use-delete-data";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useInsertData } from "@/hooks/use-insert-data";
import { useUpdateData } from "@/hooks/use-update-data";
import { Head } from "@inertiajs/react";
import { Loader2, Trash2 } from "lucide-react";

interface BankAccout {
	id: number;
	name: string;
	account_number: string;
	currency: string;
	type: string;
	open_balance: number;
	status: boolean;
}

export default function BankAccout() {
	const currentRoute = "dashboard.maintenance.bank-account";
	const currencies = ["GTQ", "USD", "EUR"] as const;
	const types = ["savings", "monetary"] as const;
	// Obtenemos las categorías de servicios
	const { categories, flash } = useFetchData<BankAccout>();

	// Eliminar una categoría de servicio
	const { deleteData, isDeleting } = useDeleteData();

	// Agregar una nueva categoría de servicio
	const { data, setData, insertData, processing, errors } = useInsertData(
		currentRoute,
		{
			name: "",
			account_number: "",
			currency: "GTQ",
			type: "monetary",
			open_balance: 0.0,
			status: true,
		},
	);

	// Actualizar una categoría de servicio
	const {
		editData,
		setEditData,
		editErrors,
		updating,
		initializeForm,
		updateData,
	} = useUpdateData({
		name: "",
		account_number: "",
		currency: "GTQ",
		type: "monetary",
		open_balance: 0.0,
		status: true,
	});

	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<div className="py-0 w-full">
				<div className="space-y-6 sm:px-6 lg:px-8">
					<h1 className="font-semibold text-2xl">Cuentas Bancarias</h1>

					<AddItemModal
						title="Agregar Cuenta Bancaria"
						triggerTitle="Cuenta"
						description="Agrega una nueva cuenta bancaria proporcionando su nombre y una breve descripción."
						onSubmit={insertData}
						processing={processing}
					>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Nombre de la Cuenta
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
								<Label htmlFor="account_number" className="text-right">
									Número de Cuenta
								</Label>
								<Input
									id="account_number"
									type="text"
									className="col-span-3"
									value={data.account_number}
									onChange={(e) => setData("account_number", e.target.value)}
									maxLength={75}
									required
								/>
								{errors.account_number && (
									<p className="text-red-500 text-sm col-span-3 col-start-2">
										{errors.account_number}
									</p>
								)}
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="details" className="text-right">
									Detalles
								</Label>
								<div
									id="details"
									className="flex items-center gap-4 col-span-3"
								>
									<Select onValueChange={(value) => setData("type", value)}>
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

									<Select onValueChange={(value) => setData("currency", value)}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Moneda" />
										</SelectTrigger>
										<SelectContent>
											{currencies.map((currency) => (
												<SelectItem key={currency} value={currency}>
													{currency}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="open_balance" className="text-right">
									Balance Inicial
								</Label>
								<Input
									id="open_balance"
									type="number"
									className="col-span-3"
									value={data.open_balance}
									onChange={(e) => setData("open_balance", e.target.value)}
									maxLength={75}
									required
								/>
								{errors.name && (
									<p className="text-red-500 text-sm col-span-3 col-start-2">
										{errors.name}
									</p>
								)}
							</div>
						</div>
					</AddItemModal>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>
								<TableHead>Nombre</TableHead>
								<TableHead>Identificador</TableHead>
								<TableHead>Moneda</TableHead>
								<TableHead>Blance</TableHead>
								<TableHead>Tipo</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead className="text-center w-0">Acción</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories.data.length > 0 ? (
								categories.data.map((category) => (
									<TableRow key={category.id}>
										<TableCell className="font-medium">{category.id}</TableCell>
										<TableCell>{category.name}</TableCell>
										<TableCell>{category.account_number}</TableCell>
										<TableCell>{category.currency}</TableCell>
										<TableCell>{category.open_balance}</TableCell>
										<TableCell>{category.type}</TableCell>
										<TableCell>
											{category.status ? "Activo" : "Inactivo"}
										</TableCell>
										<TableCell className="flex gap-2 items-center justify-center">
											{/* Modal para editar una categoria de servicio */}
											<EditItemModal
												title="Editar - Categoria de Servicio"
												triggerTitle="Editar"
												description="Edita esta categoria de servicio modificando su nombre y/o descripción."
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

													<div className="grid grid-cols-4 items-center gap-4">
														<Label
															htmlFor="account_number"
															className="text-right"
														>
															Número de Cuenta
														</Label>
														<Input
															id="account_number"
															type="text"
															className="col-span-3"
															value={editData.account_number}
															onChange={(e) =>
																setEditData("account_number", e.target.value)
															}
															maxLength={75}
															required
														/>
														{editErrors.account_number && (
															<p className="text-red-500 text-sm col-span-3 col-start-2">
																{editErrors.account_number}
															</p>
														)}
													</div>

													<div className="grid grid-cols-4 items-center gap-4">
														<Label htmlFor="details" className="text-right">
															Detalles
														</Label>
														<div
															id="details"
															className="flex items-center gap-4 col-span-3"
														>
															<Select
																value={editData.type}
																onValueChange={(value) =>
																	setEditData("type", value)
																}
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

															<Select
																value={editData.currency}
																onValueChange={(value) =>
																	setEditData("currency", value)
																}
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Moneda" />
																</SelectTrigger>
																<SelectContent>
																	{currencies.map((currency) => (
																		<SelectItem key={currency} value={currency}>
																			{currency}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
														</div>
													</div>

													<div className="grid grid-cols-4 items-center gap-4">
														<Label
															htmlFor="open_balance"
															className="text-right"
														>
															Balance Inicial
														</Label>
														<Input
															id="open_balance"
															type="number"
															className="col-span-3"
															value={editData.open_balance}
															onChange={(e) =>
																setEditData(
																	"open_balance",
																	Number.parseFloat(e.target.value),
																)
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
											{/* Eliminar Registro - INICIO */}
											<Button
												variant="destructive"
												id={`btn-delete-${category.id}`}
												disabled={isDeleting(category.id)}
												onClick={() =>
													deleteData(
														category.id,
														currentRoute,
														"¿Estás seguro de que quieres eliminar esta cuenta? Esto desabilitara todos la cuenta para cualquier accion.",
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
					{/* Componente de paginación */}
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

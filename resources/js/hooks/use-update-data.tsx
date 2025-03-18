import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

//type FormDataValue = string | number | boolean | File | null;

export function useUpdateData<T extends Record<string, any>>(
	initialData: T = {} as T,
) {
	const [updating, setUpdating] = useState(false);
	const [currentItemId, setCurrentItemId] = useState<number | null>(null);

	const form = useForm<T>(initialData);

	const initializeForm = (item: any) => {
		setCurrentItemId(item.id);
		form.setData({ ...initialData, ...item });
	};

	const resetForm = () => {
		form.reset();
		form.clearErrors();
		setCurrentItemId(null);
	};

	// Función de actualización mejorada y dinámica
	const updateData = (
		routePrefix: string,
		params: Record<string, any> = {},
	) => {
		return () => {
			if (!currentItemId) return;
			setUpdating(true);
			const routeParams = { ...params, id: currentItemId };

			form.patch(route(`${routePrefix}.update`, routeParams), {
				preserveScroll: true,
				onSuccess: () => {
					toast.success("Actualizado correctamente");
					resetForm();
					setUpdating(false);
				},
				onError: () => {
					toast.error("Error al actualizar");
					setUpdating(false);
				},
			});
		};
	};

	return {
		form,
		updateData,
		updating,
		currentItemId,
		initializeForm,
		resetForm,
		editData: form.data,
		setEditData: form.setData,
		editErrors: form.errors,
		processing: form.processing,
	};
}

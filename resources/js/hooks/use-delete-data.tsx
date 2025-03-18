import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

export const useDeleteData = () => {
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const deleteData = (
		id: number,
		routePrefix: string,
		confirmationMessage: string,
	) => {
		if (confirm(confirmationMessage)) {
			setDeletingId(id);

			router.delete(route(`${routePrefix}.destroy`, { id }), {
				onSuccess: () => {
					toast.success("Registro eliminado correctamente.");
				},
				onError: () => {
					toast.error("Ocurrió un error al eliminar el registro.");
				},
				onFinish: () => setDeletingId(null),
			});
		}
	};

	const isDeleting = (id: number) => deletingId === id;

	return { deleteData, isDeleting };
};

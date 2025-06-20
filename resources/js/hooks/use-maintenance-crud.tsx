import { router } from "@inertiajs/core";
import type { UseFormReturn } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

interface UseCRUDOptions<T extends FieldValues> {
	form: UseFormReturn<T>;
	routePrefix: string;
}

export function useMaintenanceCrud<T extends z.ZodType>(
	formSchema: T,
	routePrefix: string,
) {
	//INSERT
	function onSubmitInsert(values: z.infer<typeof formSchema>) {
		router.post(route(`${routePrefix}.store`), values, {
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

	function onSubmitUpdate(
		values: z.infer<typeof formSchema>,
		id: number,
		options?: UseCRUDOptions<z.infer<typeof formSchema>>,
	) {
		router.patch(route(`${routePrefix}.update`, { id: id }), values, {
			onSuccess: (page) => {
				const flash = page.props.flash as Record<string, unknown>;
				if (flash && "success" in flash) {
					toast.success(String(flash.success));
				}
				options?.form.reset();
			},
			onError: (errors) => {
				if (errors.error) {
					toast.error(String(errors.error));
				}
			},
		});
	}

	return {
		onSubmitInsert,
		onSubmitUpdate,
	};
}

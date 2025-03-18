import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

type FormDataValue = string | number | boolean | File | null;

interface UseInsertDataReturn<T> {
	data: T;
	setData: (field: keyof T, value: T[keyof T]) => void;
	insertData: () => void;
	processing: boolean;
	errors: Partial<Record<keyof T, string>>;
	reset: () => void;
}

export const useInsertData = <T extends Record<string, FormDataValue>>(
	routePrefix: string,
	initialValues: T,
): UseInsertDataReturn<T> => {
	const { data, setData, post, processing, errors, reset } =
		useForm<T>(initialValues);

	const insertData = () => {
		post(route(`${routePrefix}.store`), {
			preserveScroll: true,
			onSuccess: () => {
				toast.success("Agregado correctamente");
				reset();
			},
			onError: () => {
				toast.error("Error al agregar");
			},
		});
	};

	return { data, setData, insertData, processing, errors, reset };
};

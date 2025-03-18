import { usePage } from "@inertiajs/react";

export function useFetchData<T>() {
	const {
		categories = { data: [], links: [], current_page: 1, last_page: 1 },
		flash,
	} = usePage().props as unknown as {
		categories: {
			data: T[];
			links: { url: string | null; label: string; active: boolean }[];
			current_page: number;
			last_page: number;
		};
		flash?: { success?: string; error?: string };
	};

	return {
		categories,
		flash,
	};
}

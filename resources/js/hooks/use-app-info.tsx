import { usePage } from "@inertiajs/react";

interface AppInfo {
	name: string;
	version?: string;
	env?: string;
}

export function useAppInfo(): AppInfo {
	const { app } = usePage().props as unknown as { app: AppInfo };
	return app;
}

import type { ReactNode } from "react";

interface Props {
	title: string;
	header: React.ReactNode;
	content: React.ReactNode;
}

export function MaintenanceLayout({ title, header, content }: Props) {
	return (
		<div className="py-0 w-full">
			<div className="space-y-6 sm:px-6 lg:px-8">
				<h1 className="font-semibold text-2xl">{title}</h1>
				<div className="flex gap-4">{header}</div>
				{content}
			</div>
		</div>
	);
}

import { Button } from "@/Components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddItemModalProps {
	triggerTitle: string;
	title: string;
	description?: string;
	processing?: boolean;
	children: React.ReactNode;
	onSubmit: () => void;
}

export function AddItemModal({
	triggerTitle,
	title,
	description,
	children,
	processing,
	onSubmit,
}: AddItemModalProps) {
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSubmit();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default">
					<Plus />
					{triggerTitle}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">{children}</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cerrar
						</Button>
						<Button type="submit" disabled={processing}>
							Agregar
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

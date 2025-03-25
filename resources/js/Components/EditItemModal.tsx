import { Button } from "@/Components/atoms/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/atoms/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface EditItemModalProps {
	triggerTitle: string;
	title: string;
	description?: string;
	processing?: boolean;
	children: React.ReactNode;
	onSubmit: () => void;
	onTriggerClick?: () => void;
}

export function EditItemModal({
	triggerTitle,
	title,
	description,
	children,
	processing,
	onSubmit,
	onTriggerClick,
}: EditItemModalProps) {
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSubmit();
		setOpen(false);
	};

	const handleTriggerClick = () => {
		if (onTriggerClick) {
			onTriggerClick();
		}
		setOpen(true);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={handleTriggerClick} type="button">
					<Pencil size={16} />
					{triggerTitle}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[576px]">
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
							Guardar
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

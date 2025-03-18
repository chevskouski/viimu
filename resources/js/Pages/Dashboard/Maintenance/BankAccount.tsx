import { AddItemModal } from "@/Components/AddItemModal";
import { EditItemModal } from "@/Components/EditItemModal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/Components/ui/pagination";
import { Switch } from "@/Components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ExpenseCategory {
	id: number;
	name: string;
	description: string;
	status: boolean;
}

export default function BankAccout() {
	return (
		<AuthenticatedLayout>
			<Head title="Maintenance" />
			<div className="py-0 w-full">
				<div className="space-y-6 sm:px-6 lg:px-8">
					<h1 className="font-semibold text-2xl">Cuentas Bancarias</h1>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

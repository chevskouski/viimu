import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Components/atoms/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/Components/ui/card";
import type { InventoryMovement } from "@/lib/types/types";
import { MoveDown, MoveUp } from "lucide-react";

interface Props {
	lastInventoryMovements: InventoryMovement[];
}

export function LastInventoryMovementCard({ lastInventoryMovements }: Props) {
	return (
		<Card className="h-full w-full">
			<CardHeader>
				<CardDescription>Ultimos Movimientos</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nombre</TableHead>
							<TableHead>Tipo</TableHead>
							<TableHead>Cantidad</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{lastInventoryMovements.map((lastInventoryMovement) => (
							<TableRow key={lastInventoryMovement.id}>
								<TableCell>{lastInventoryMovement.inventory.name}</TableCell>
								<TableCell>
									{lastInventoryMovement.type === "in" ? (
										<span className="flex items-center">
											<MoveDown
												className="dark:text-green-700 text-green-400"
												size={12}
											/>
											Ingreso
										</span>
									) : (
										<span className="flex items-center">
											<MoveUp
												className="dark:text-red-700 text-red-500"
												size={12}
											/>
											Salida
										</span>
									)}
								</TableCell>
								<TableCell>{lastInventoryMovement.quantity}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

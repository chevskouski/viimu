import { router } from "@inertiajs/react";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/Components/atoms/pagination";

interface PaginationLinkProps {
	url: string | null;
	label: string;
	active: boolean;
}

interface PaginationProps {
	links: PaginationLinkProps[];
	lastPage: number;
}

export const TablePagination: React.FC<PaginationProps> = ({
	links,
	lastPage,
}) => {
	if (lastPage <= 1) {
		return null;
	}

	// Formatear etiquetas de enlaces (eliminar caracteres especiales)
	const formatLinkLabel = (label: string): string => {
		return label.replace(/&laquo;|&raquo;/g, "");
	};

	// Filtrar enlaces de paginación
	const pageLinks = links.filter(
		(link) =>
			!link.label.includes("&laquo;") && !link.label.includes("&raquo;"),
	);

	const prevLink = links.find((link) => link.label.includes("&laquo;"));
	const nextLink = links.find((link) => link.label.includes("&raquo;"));

	// Manejar cambio de página
	const handlePageChange = (url: string | null) => {
		if (url) {
			router.visit(url);
		}
	};

	return (
		<div className="flex justify-center mt-4">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							label="Anterior"
							href="#"
							onClick={(e) => {
								e.preventDefault();
								handlePageChange(prevLink?.url || null);
							}}
							className={
								!prevLink?.url
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>

					{pageLinks.map((link) => (
						<PaginationItem key={link.label}>
							<PaginationLink
								href="#"
								onClick={(e) => {
									e.preventDefault();
									handlePageChange(link.url);
								}}
								isActive={link.active}
							>
								{formatLinkLabel(link.label)}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							label="Siguiente"
							href="#"
							onClick={(e) => {
								e.preventDefault();
								handlePageChange(nextLink?.url || null);
							}}
							className={
								!nextLink?.url
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
} from "@/Components/atoms/pagination";

interface PaginationLinkProps {
	url: string | null;
	label: string;
	active: boolean;
}

interface GenericPaginationProps {
	links: PaginationLinkProps[];
	onPageChange?: (url: string) => void;
	className?: string;
}

const formatLinkLabel = (label: string): string => {
	return label.replace(/&laquo;|&raquo;/g, "");
};

export const GenericPagination: React.FC<GenericPaginationProps> = ({
	links,
	onPageChange,
	className = "",
}) => {
	if (links.length <= 3) {
		return null;
	}

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
		if (onPageChange) {
			e.preventDefault();
			onPageChange(url);
		}
	};

	return (
		<Pagination className={className}>
			<PaginationContent>
				{links.map((link, index) => (
					<PaginationItem key={`${link.label}-${index}`}>
						{link.url ? (
							<PaginationLink
								href={link.url}
								onClick={(e) => link.url && handleClick(e, link.url)}
								className={
									link.active
										? "w-fit h-fit px-3 py-1.5 font-bold"
										: "w-fit h-fit px-3 py-1.5 text-white/50"
								}
							>
								{formatLinkLabel(link.label)}
							</PaginationLink>
						) : (
							<PaginationEllipsis className="text-white/50" />
						)}
					</PaginationItem>
				))}
			</PaginationContent>
		</Pagination>
	);
};

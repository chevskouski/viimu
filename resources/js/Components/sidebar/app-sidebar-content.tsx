import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/Components/atoms/collapsible";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from "@/Components/atoms/sidebar";
import { usePage } from "@inertiajs/react";
import {
	BarChart2,
	Boxes,
	ChartArea,
	ChevronDown,
	ChevronUp,
	ClipboardPlus,
	Command,
	FilePlus,
	Settings,
	ShoppingBasket,
	Users,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
	{
		title: "Dashboard",
		icon: ChartArea,
		href: "/dashboard",
	},
	{
		title: "Órdenes",
		icon: ClipboardPlus,
		subItems: [
			{ label: "Nueva Orden", href: "#", icon: FilePlus },
			{ label: "Reporte", href: "#", icon: BarChart2 },
		],
	},
	{
		title: "Gastos",
		icon: ShoppingBasket,
		subItems: [
			{ label: "Nuevo Gasto", href: "#", icon: FilePlus },
			{ label: "Reporte", href: "#", icon: BarChart2 },
		],
	},
	{
		title: "Clientes",
		icon: Users,
		href: "#",
	},
	{
		title: "Inventario",
		icon: Boxes,
		href: "#",
	},
	{
		title: "Mantenimientos",
		icon: Command,
		subItems: [
			{
				label: "Servicios",
				href: "/dashboard/maintenance/services",
				icon: Settings,
			},
			{
				label: "Categorías de Servicios",
				href: "/dashboard/maintenance/service-category",
				icon: Settings,
			},
			{
				label: "Categoría de Gastos",
				href: "/dashboard/maintenance/expense-category",
				icon: Settings,
			},
			{
				label: "Cuentas Bancarias",
				href: "/dashboard/maintenance/bank-account",
				icon: Settings,
			},
		],
	},
];

export function AppSidebarContent() {
	const { url } = usePage();
	const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

	useState(() => {
		const initialState: Record<string, boolean> = {};
		for (const menu of menuItems) {
			initialState[menu.title] =
				menu.subItems?.some((subItem) => url === subItem.href) || false;
		}
		setOpenItems(initialState);
	});

	const handleToggle = (title: string) => {
		setOpenItems((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	return (
		<SidebarMenu>
			{menuItems.map((menu) =>
				menu.subItems ? (
					<Collapsible
						key={menu.title}
						defaultOpen={menu.subItems.some((subItem) => url === subItem.href)}
						className="group/collapsible"
						onOpenChange={(open) =>
							setOpenItems((prev) => ({ ...prev, [menu.title]: open }))
						}
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									onClick={() => handleToggle(menu.title)}
									className="text-foreground"
								>
									<menu.icon className="w-5 h-5 mr-2" />
									{menu.title}
									{openItems[menu.title] ? (
										<ChevronUp className="ml-auto" />
									) : (
										<ChevronDown className="ml-auto" />
									)}
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{menu.subItems.map((subItem) => (
										<SidebarMenuSubItem key={subItem.href}>
											<a
												href={subItem.href}
												className={`flex items-center p-1.5 rounded-md ${
													url === subItem.href
														? "bg-muted-foreground text-background"
														: ""
												}`}
											>
												<subItem.icon className="w-4 h-4 mr-2" />
												{subItem.label}
											</a>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				) : (
					<SidebarMenuItem className="text-foreground" key={menu.title}>
						<SidebarMenuButton asChild>
							<a
								href={menu.href}
								className={`flex items-center ${
									url === menu.href ? "bg-muted-foreground text-background" : ""
								}`}
							>
								<menu.icon className="w-5 h-5 mr-2" />
								{menu.title}
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				),
			)}
		</SidebarMenu>
	);
}

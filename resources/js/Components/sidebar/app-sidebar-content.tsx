import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
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
			{ label: "Servicios", href: "#", icon: Settings },
			{ label: "Tipo de Servicios", href: "#", icon: Settings },
			{ label: "Categoría de Gastos", href: "#", icon: Settings },
		],
	},
];

export function AppSidebarContent() {
	const { url } = usePage();
	const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

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
						defaultOpen={false}
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
											<a href={subItem.href} className="flex items-center">
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
								className={`flex items-center ${url === menu.href ? "bg-muted-foreground text-background" : ""}`}
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

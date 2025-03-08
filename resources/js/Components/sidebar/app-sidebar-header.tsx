import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { useAppInfo } from "@/hooks/use-app-info";
import Logo from "../../../assets/viimu-logo-blanco.webp";

export function AppSidebarHeader() {
	const app = useAppInfo();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size="lg" asChild>
					<a href="/dashboard">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background/50 text-sidebar-primary-foreground">
							<img src={Logo} alt="Viimu" className="w-6 h-auto" />
						</div>
						<div className="flex flex-col gap-0.5 leading-none">
							<span className="font-semibold">Panel de Control</span>
							<span className="text-white/50 text-xs font-light">
								{app.version}
							</span>
						</div>
					</a>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

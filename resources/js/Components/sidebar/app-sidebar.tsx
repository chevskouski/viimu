import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { AppSidebarContent } from "./app-sidebar-content";
import { NavUser } from "./app-sidebar-footer";
import { AppSidebarHeader } from "./app-sidebar-header";

export function AppSidebar() {
	const user = usePage().props.auth.user;
	return (
		<Sidebar>
			<SidebarHeader>
				<AppSidebarHeader />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<AppSidebarContent />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						name: user.name,
						email: user.email,
						avatar: "https://randomuser.me",
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/Components/atoms/breadcrumb";
import { Separator } from "@/Components/atoms/separator";
import { SidebarProvider, SidebarTrigger } from "@/Components/atoms/sidebar";
import { Toaster } from "@/Components/atoms/sonner";
import { AppSidebar } from "@/Components/sidebar/app-sidebar";
import { usePage } from "@inertiajs/react";
import React, { type PropsWithChildren, type ReactNode, useMemo } from "react";

interface BreadcrumbSegment {
	name: string;
	href: string;
	current: boolean;
}

export default function Authenticated({ children }: PropsWithChildren) {
	const page = usePage();
	const url = page.url;

	const homePage = "/dashboard";
	const homeTitle = "Dashboard";

	const breadcrumbs: BreadcrumbSegment[] = useMemo(() => {
		if (url === homePage || url === "/") {
			return [{ name: homeTitle, href: homePage, current: true }];
		}
		const segments = url.split("/").filter(Boolean);
		const breadcrumbSegments: BreadcrumbSegment[] = [
			{ name: homeTitle, href: homePage, current: false },
		];
		const startIndex = segments[0] === "dashboard" ? 1 : 0;
		let accumulatedPath = startIndex === 1 ? homePage : "";
		segments.slice(startIndex).forEach((segment, index, filteredSegments) => {
			accumulatedPath += `/${segment}`;
			const displayName = segment
				.replace(/-|_/g, " ")
				.replace(/\b\w/g, (char) => char.toUpperCase());

			breadcrumbSegments.push({
				name: displayName,
				href: accumulatedPath,
				current: index === filteredSegments.length - 1,
			});
		});
		return breadcrumbSegments;
	}, [url]);

	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="flex-1 flex flex-col bg-gray-100 dark:bg-background">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbs.map((breadcrumb, index) => (
									<React.Fragment key={breadcrumb.href}>
										<BreadcrumbItem
											className={index === 0 ? "hidden md:block" : ""}
										>
											{breadcrumb.current ? (
												<BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
											) : (
												<BreadcrumbLink href={breadcrumb.href}>
													{breadcrumb.name}
												</BreadcrumbLink>
											)}
										</BreadcrumbItem>
										{index < breadcrumbs.length - 1 && (
											<BreadcrumbSeparator
												className={index === 0 ? "hidden md:block" : ""}
											/>
										)}
									</React.Fragment>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<main className="flex">{children}</main>
				<Toaster />
			</div>
		</SidebarProvider>
	);
}

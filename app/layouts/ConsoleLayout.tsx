import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
	Button,
	Modal,
	ModalBackdrop,
	ModalContainer,
	ModalDialog,
} from "@heroui/react";
import { ConsoleBrand } from "@/components/console/ConsoleShared";
import { logoutWithRevoke } from "@/api/auth";
import {
	FiBriefcase,
	FiFileText,
	FiGrid,
	FiLogOut,
	FiSettings,
	FiUserCheck,
	FiUsers,
	FiX,
} from "react-icons/fi";

// eslint-disable-next-line react-refresh/only-export-components
export function meta() {
	return [{ name: "robots", content: "noindex, nofollow" }];
}

const NAV_ITEMS = [
	{ to: "/console", label: "Dashboard", icon: FiGrid, exact: true },
	{ to: "/console/jobs", label: "Jobs", icon: FiBriefcase },
	{ to: "/console/team", label: "Team", icon: FiUserCheck },
	{ to: "/console/drafts", label: "Drafts", icon: FiFileText },
	{ to: "/console/candidates", label: "Candidates", icon: FiUsers },
	{ to: "/console/settings", label: "Settings", icon: FiSettings },
];

export default function ConsoleLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [logoutModalOpen, setLogoutModalOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	// if (checking) {
	// 	return (
	// 		<div className="flex min-h-screen items-center justify-center bg-[#FCFBF8]">
	// 			<Spinner size="lg" color="warning" />
	// 		</div>
	// 	);
	// }

	function isActive(to: string, exact?: boolean) {
		if (exact) return location.pathname === to;
		return location.pathname.startsWith(to);
	}

	async function handleConfirmLogout(): Promise<void> {
		setIsLoggingOut(true);
		try {
			await logoutWithRevoke();
			navigate("/login", { replace: true });
		} finally {
			setIsLoggingOut(false);
			setLogoutModalOpen(false);
		}
	}

	return (
		<div className="flex min-h-screen bg-white text-[#1F2534]">
			<div
				className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity lg:hidden ${
					sidebarOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}
				aria-hidden={!sidebarOpen}
				onClick={() => setSidebarOpen(false)}
			/>

			<aside
				className={`fixed left-0 top-0 z-50 flex h-full w-[min(18rem,100vw)] shrink-0 flex-col border-r border-[#E7E2D8] bg-white shadow-xl transition-transform duration-200 ease-out lg:h-[calc(100dvh-4rem)] lg:w-64 lg:translate-x-0 lg:shadow-none ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
				aria-label="Sidebar"
			>
				<div className="flex h-16 shrink-0 items-center justify-between border-b border-[#ECE8DF] px-4 lg:hidden">
					<ConsoleBrand />
					<button
						type="button"
						className="text-[#7B8090] lg:hidden"
						onClick={() => setSidebarOpen(false)}
						aria-label="Close sidebar"
					>
						<FiX size={22} />
					</button>
				</div>

				<div className="hidden h-16 shrink-0 items-center border-b border-[#ECE8DF] px-4 lg:flex">
					<ConsoleBrand />
				</div>

				<nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-5">
					<ul className="flex flex-col gap-1">
						{NAV_ITEMS.map((item) => (
							<li key={item.to}>
								<Link
									to={item.to}
									prefetch="intent"
									onClick={() => setSidebarOpen(false)}
									className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
										isActive(item.to, item.exact)
											? "bg-[#F9F3E4] text-[#E2BA51]"
											: "text-[#646B7D] hover:bg-[#FAF7F0] hover:text-[#1F2534]"
									}`}
								>
									<item.icon size={20} />
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="shrink-0 border-t border-[#ECE8DF] p-5">
					<button
						type="button"
						onPress={() => setLogoutModalOpen(true)}
						className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#F04337] transition-colors hover:bg-[#FFF5F3]"
					>
						<FiLogOut size={18} />
						Logout
					</button>
				</div>
			</aside>

			<Modal>
				<ModalBackdrop
					isOpen={logoutModalOpen}
					onOpenChange={setLogoutModalOpen}
					variant="blur"
				>
					<ModalContainer size="sm" className="rounded-[20px] bg-white">
						<ModalDialog>
							{({ close }) => (
								<div className="px-6 py-6">
									<h3 className="font-heading text-[1.6rem] font-semibold text-[#1F2534]">
										Confirm Logout
									</h3>
									<p className="mt-2 text-sm text-[#707788]">
										Are you sure you want to log out of your admin session?
									</p>
									<div className="mt-6 grid grid-cols-2 gap-3">
										<Button
											variant="secondary"
											className="h-11 rounded-xl border-[#E5E1D8] bg-white font-semibold text-[#434959]"
											onPress={close}
											isDisabled={isLoggingOut}
										>
											Cancel
										</Button>
										<Button
											className="h-11 rounded-xl bg-[#E62A25] font-semibold text-white"
											onPress={handleConfirmLogout}
											isPending={isLoggingOut}
										>
											Logout
										</Button>
									</div>
								</div>
							)}
						</ModalDialog>
					</ModalContainer>
				</ModalBackdrop>
			</Modal>

			<div className="flex flex-1 flex-col">
				<main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-0 lg:py-0 lg:ml-66">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

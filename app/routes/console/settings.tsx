import { Button, Checkbox, Input } from "@heroui/react";
import {
	ConsolePageHeader,
	ConsolePanel,
} from "@/components/console/ConsoleShared";

export default function ConsoleSettingsPage() {
	return (
		<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-8">
			<ConsolePageHeader
				title="Settings"
				description="Configure your admin preferences"
			/>

			<div className="flex justify-center">
				<ConsolePanel className="w-full max-w-115">
					<div className="p-6 sm:p-8">
						<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
							Admin Settings
						</h2>

						<div className="mt-8 border-b border-[#ECE8DF] pb-6">
							<h3 className="text-base font-semibold text-[#1F2534]">
								Profile Information
							</h3>
							<div className="mt-4">
								<Input
									label="Admin Email"
									labelPlacement="outside"
									defaultValue="admin@saltech.com"
									classNames={{
										label: "text-sm font-medium text-[#1F2534]",
										inputWrapper:
											"rounded-xl border border-[#E7E2D8] bg-white shadow-none",
										input: "text-[#1F2534]",
									}}
								/>
							</div>
						</div>

						<div className="pt-6">
							<h3 className="text-base font-semibold text-[#1F2534]">
								Notifications
							</h3>
							<div className="mt-4 flex flex-col gap-4 text-sm text-[#5F6677]">
								<Checkbox
									classNames={{ label: "text-[#5F6677]" }}
									color="warning"
								>
									Email notifications for new applications
								</Checkbox>
								<Checkbox
									classNames={{ label: "text-[#5F6677]" }}
									color="warning"
								>
									Weekly hiring summary
								</Checkbox>
							</div>
						</div>

						<Button className="mt-8 h-12 w-full rounded-xl bg-[#E2BA51] font-semibold text-[#1F2534]">
							Save Settings
						</Button>
					</div>
				</ConsolePanel>
			</div>
		</div>
	);
}

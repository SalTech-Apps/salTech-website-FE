import { Button, Checkbox, Input, Label, TextField } from "@heroui/react";
import {
	ConsolePageHeader,
	ConsolePanel,
} from "@/components/console/ConsoleShared";

export default function ConsoleSettingsPage() {
	return (
		<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-2">
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
								<TextField>
									<Label className="text-sm font-medium text-[#1F2534]">
										Admin Email
									</Label>
									<Input
										type="email"
										defaultValue="admin@saltech.com"
										className="h-12 rounded-xl border border-[#E7E2D8] bg-white px-4 text-[#1F2534]"
										readOnly
									/>
								</TextField>
							</div>
						</div>

						<div className="pt-6">
							<h3 className="text-base font-semibold text-[#1F2534]">
								Notifications
							</h3>
							<div className="mt-4 flex flex-col gap-4 text-sm text-[#5F6677]">
								<Checkbox id="notify-applications" defaultSelected>
									<Checkbox.Control className="h-4 w-4 rounded-sm border border-[#d0d5dd]">
										<Checkbox.Indicator />
									</Checkbox.Control>
									<Checkbox.Content>
										<Label htmlFor="notify-applications">
											Email notifications for new applications
										</Label>
									</Checkbox.Content>
								</Checkbox>
								<Checkbox id="notify-weekly" defaultSelected>
									<Checkbox.Control className="h-4 w-4 rounded-sm border border-[#d0d5dd]">
										<Checkbox.Indicator />
									</Checkbox.Control>
									<Checkbox.Content>
										<Label htmlFor="notify-weekly">Weekly hiring summary</Label>
									</Checkbox.Content>
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

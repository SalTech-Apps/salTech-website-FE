import { Button } from "@heroui/react";

interface ApplicationSuccessStateProps {
	onDone: () => void;
	onReset: () => void;
}

export function ApplicationSuccessState({
	onDone,
	onReset,
}: ApplicationSuccessStateProps) {
	return (
		<div className="space-y-6">
			<div className="rounded-lg border border-[#d1fae5] bg-[#f0fdf4] p-6">
				<h3 className="text-xl font-semibold text-[#111827]">
					Application Submitted
				</h3>
				<p className="mt-2 text-[#6b7280]">
					Your application has been received. We will review it within 3-5
					business days.
				</p>
			</div>
			<div className="flex gap-3">
				<Button className="bg-[#c99e2e] text-[#111827]" onPress={onDone}>
					Done
				</Button>
				<Button variant="bordered" onPress={onReset}>
					Start New Application
				</Button>
			</div>
		</div>
	);
}

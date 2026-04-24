import { ModalHeader } from "@heroui/react";

interface ApplicationModalHeaderProps {
	jobTitle: string;
	onBack: () => void;
}

export function ApplicationModalHeader({
	jobTitle,
	onBack,
}: ApplicationModalHeaderProps) {
	return (
		<>
			<div className="mb-6">
				<button
					type="button"
					onClick={onBack}
					className="flex items-center gap-2 text-sm font-medium text-[#6b7280] transition-colors hover:text-[#111827]"
				>
					<span aria-hidden>←</span>
					Back to Job Details
				</button>
			</div>

			<ModalHeader className="flex flex-col items-center gap-2 px-0 pb-0 text-center">
				<h2 className="font-saltech-display text-5xl leading-none text-[#111827]">
					Apply for this Position
				</h2>
				<p className="text-base text-[#6b7280] md:text-[18px]">
					{jobTitle} · SalTech
				</p>
			</ModalHeader>
		</>
	);
}

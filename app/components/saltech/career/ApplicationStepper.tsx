import type { CareerApplicationStep } from "@/atoms/careerApplication.atom";
import type { StepDefinition } from "./ApplicationFormTypes";

interface ApplicationStepperProps {
	steps: StepDefinition[];
	currentStep: CareerApplicationStep;
	stepIndex: number;
}

export function ApplicationStepper({
	steps,
	currentStep,
	stepIndex,
}: ApplicationStepperProps) {
	return (
		<div className="mx-auto mt-10 w-full max-w-3xl">
			<div className="grid grid-cols-3 gap-4">
				{steps.map((step, index) => {
					const active = step.step === currentStep;
					const complete = index < stepIndex;

					return (
						<div
							key={step.step}
							className="relative flex flex-col items-center"
						>
							{index < steps.length - 1 && (
								<div className="absolute left-[62%] top-4 h-0.5 w-[76%] bg-[#d1d5db]" />
							)}
							<div
								className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-3xl font-semibold ${
									active || complete
										? "bg-[#c99e2e] text-[#111827]"
										: "bg-[#f3f4f6] text-[#9ca3af]"
								}`}
							>
								{index + 1}
							</div>
							<p className="mt-4 text-sm font-medium text-[#6b7280]">
								{step.name}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

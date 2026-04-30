import { useState } from "react";
import { Link } from "react-router";
import { Button, Input } from "@heroui/react";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { AppFooter } from "@/components/app-footer/AppFooter";
import { SaltechIcon } from "@/assets/SaltechIcon";
import { login } from "@/api/admin";
import type { LoginRequest } from "@/client";
import { LoginSchema } from "@/schemas/auth.schema";
import { apiErrorParser } from "@/lib/errorParser";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const form = useForm<LoginSchema>({
		mode: "onChange",
		reValidateMode: "onChange",
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const emailValue =
		useWatch({
			control: form.control,
			name: "email",
		}) ?? "";
	const passwordValue =
		useWatch({
			control: form.control,
			name: "password",
		}) ?? "";

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: () => {
			toast.success("Signed in successfully");
			navigate("/console", { replace: true });
		},
		onError: (err) => {
			const error = apiErrorParser(err);
			toast.error(error.message);
		},
	});

	const canSubmit =
		emailValue.trim().length > 0 &&
		passwordValue.trim().length > 0 &&
		form.formState.isValid &&
		!loginMutation.isPending;

	const handleSubmit = (data: LoginRequest) => {
		loginMutation.mutate(data);
	};

	return (
		<>
			<div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f7f8fb] font-saltech-sans text-slate-700">
				<div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-4 py-10 sm:py-14">
					<Link to="/" className="mb-8 flex items-center gap-2 text-[#4b4b4b]">
						<SaltechIcon className="h-9 w-9" />
						<p className="text-2xl font-extrabold leading-none tracking-tight font-heading">
							<span className="text-[#d0ad4f]">Sal</span>
							<span className="text-[#404040]">Tech</span>
						</p>
					</Link>

					<div className="w-full max-w-88 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:max-w-md sm:p-9">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center justify-center">
								<div className="relative flex items-center gap-2 rounded-xl bg-[#E2BA511A] h-14 w-14 justify-center">
									<div className="grid place-items-center rounded-lg text-[#E2BA51]">
										<FiLock size={24} />
									</div>
								</div>
								<div className="text-center gap-2 flex flex-col">
									<h1 className="font-heading text-2xl md:text-4xl font-semibold leading-tight text-[#111827]">
										Employee Login
									</h1>
									<p className="text-sm text-[#6B7280]">
										Access the admin dashboard
									</p>
								</div>
							</div>

							<form
								className="space-y-4"
								onSubmit={form.handleSubmit(handleSubmit)}
							>
								<Input
									label="Email Address"
									labelPlacement="outside"
									placeholder="admin@saltech.com"
									{...form.register("email")}
									startContent={<FiMail className="text-[#A1A7B5]" />}
									type="email"
									classNames={{
										label: "text-sm font-medium text-[#1F2534]",
										input: "text-[#1F2534] placeholder:text-[#ADB2BF]",
										inputWrapper:
											"h-12 rounded-xl border border-[#E7E2D8] bg-white shadow-none",
									}}
									required
									isDisabled={loginMutation.isPending}
								/>
								<Input
									label="Password"
									labelPlacement="outside"
									placeholder="••••••••"
									{...form.register("password")}
									startContent={<FiLock className="text-[#A1A7B5]" />}
									endContent={
										<button
											type="button"
											onClick={() => setShowPassword((value) => !value)}
											className="text-[#A1A7B5]"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											{showPassword ? <FiEyeOff /> : <FiEye />}
										</button>
									}
									type={showPassword ? "text" : "password"}
									classNames={{
										input: "text-[#1F2534] placeholder:text-[#ADB2BF]",
										inputWrapper:
											"h-12 rounded-xl border border-[#E7E2D8] bg-white shadow-none",
									}}
									required
									isDisabled={loginMutation.isPending}
								/>
								<div className="pt-1 flex justify-end">
									<Button
										type="button"
										variant="light"
										size="sm"
										className="h-auto min-w-0 px-0 text-[#d0ad4f] hover:text-[#ba9335]"
										isDisabled={loginMutation.isPending}
									>
										Forgot password?
									</Button>
								</div>

								<Button
									type="submit"
									isLoading={loginMutation.isPending}
									className="mt-1 w-full rounded-lg bg-[#E2BA51]"
									isDisabled={!canSubmit}
								>
									Sign In
								</Button>
							</form>

							<div className="my-6 border-t border-[#e7e9ef]" />

							<Button
								as={Link}
								to="/"
								variant="light"
								startContent={<FiArrowLeft size={13} />}
								className="h-auto min-w-0 px-0 text-[0.82rem] text-slate-500 transition hover:text-slate-700"
							>
								Back to Website
							</Button>
						</div>
					</div>

					<p className="mt-8 text-center text-sm text-[#9CA3AF] sm:mt-10">
						For security reasons, this area is restricted to authorized
						personnel only.
					</p>
				</div>
			</div>
			<AppFooter />
		</>
	);
}

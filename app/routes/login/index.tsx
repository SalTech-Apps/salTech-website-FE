import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
	Button,
	FieldError,
	InputGroup,
	Label,
	TextField,
} from "@heroui/react";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
			console.log(err);

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
								<TextField
									fullWidth
									className="w-full"
									name="email"
									isInvalid={!!form.formState.errors.email}
									isDisabled={loginMutation.isPending}
								>
									<Label className="text-sm font-medium text-[#1F2534]">
										Email address
									</Label>
									<InputGroup className="rounded-xl border border-[#E7E2D8] bg-white">
										<InputGroup.Prefix>
											<FiMail className="size-4 text-[#A1A7B5]" />
										</InputGroup.Prefix>
										<InputGroup.Input
											type="email"
											className="h-10 bg-transparent px-0 text-[#1F2534] placeholder:text-[#ADB2BF]"
											placeholder="name@email.com"
											{...form.register("email")}
										/>
									</InputGroup>
									<FieldError>
										{form.formState.errors.email?.message}
									</FieldError>
								</TextField>

								<TextField isInvalid={!!form.formState.errors.password}>
									<Label className="text-sm font-medium text-[#1F2534]">
										Password
									</Label>
									<InputGroup className="rounded-xl border border-[#E7E2D8] bg-white">
										<InputGroup.Prefix>
											<FiLock className="size-4 text-[#A1A7B5]" />
										</InputGroup.Prefix>
										<InputGroup.Input
											type={showPassword ? "text" : "password"}
											placeholder="••••••••"
											{...form.register("password")}
											disabled={loginMutation.isPending}
											className="h-10 border-0 bg-transparent px-0 text-[#1F2534] placeholder:text-[#ADB2BF]"
										/>
										<InputGroup.Suffix className="pr-3">
											<Button
												type="button"
												isIconOnly
												onPress={() => setShowPassword((value) => !value)}
												className="text-[#A1A7B5] hover:bg-transparent"
												variant="ghost"
												aria-label={
													showPassword ? "Hide password" : "Show password"
												}
											>
												{showPassword ? <FiEyeOff /> : <FiEye />}
											</Button>
										</InputGroup.Suffix>
									</InputGroup>
									<FieldError>
										{form.formState.errors.password?.message}
									</FieldError>
								</TextField>
								<div className="pt-1 flex justify-end">
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="h-auto min-w-0 rounded-xl px-0 text-[#d0ad4f] hover:text-[#ba9335]"
										isDisabled={loginMutation.isPending}
									>
										Forgot password?
									</Button>
								</div>

								<Button
									type="submit"
									isPending={loginMutation.isPending}
									isDisabled={!canSubmit}
									size="lg"
									className="mt-1 w-full rounded-xl bg-[#E2BA51] h-12"
								>
									Sign In
								</Button>
							</form>

							<div className="my-6 border-t border-[#e7e9ef]" />

							<Link to="/" prefetch="intent">
								<Button
									variant="ghost"
									className="flex h-auto min-w-0 items-center gap-2 rounded-xl px-0 text-[0.82rem] text-slate-500 transition hover:text-slate-700"
								>
									<FiArrowLeft size={13} />
									Back to Website
								</Button>
							</Link>
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

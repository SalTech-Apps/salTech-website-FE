import z from "zod";

export const LoginSchema = z.object({
	email: z
		.email({ message: "Incorrect email format" })
		.trim()
		.transform((val) => val.toLowerCase()),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

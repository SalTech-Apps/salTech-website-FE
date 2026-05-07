import { z } from "zod";
import { ApiSuccessResponseSchema } from "./auth.schema.ts";

export const TeamMemberGroupSchema = z.enum([
	"leadership",
	"engineering-design",
	"product-operations",
]);

export const TeamMemberSchema = z.object({
	id: z.string(),
	name: z.string(),
	position: z.string(),
	group: TeamMemberGroupSchema.optional(),
	shortDescription: z.string().optional(),
	detailedDescription: z.string().optional(),
	profileImageUrl: z.string().url().optional(),
	email: z.string().email().optional(),
	phone: z.string().optional(),
	linkedinUrl: z.string().url().optional(),
	twitterUrl: z.string().url().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CreateTeamMemberRequestSchema = TeamMemberSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const UpdateTeamMemberRequestSchema =
	CreateTeamMemberRequestSchema.partial();

export const TeamMemberResponseSchema =
	ApiSuccessResponseSchema(TeamMemberSchema);
export const TeamMembersListResponseSchema = ApiSuccessResponseSchema(
	z.array(TeamMemberSchema),
);
export const TeamMemberDeleteResponseSchema = ApiSuccessResponseSchema(
	z.object({ id: z.string() }),
);

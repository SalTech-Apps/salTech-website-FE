import { z } from "zod";
import { openApiRegistry } from "./registry.ts";
import { ApiErrorSchema } from "../schemas/auth.schema.ts";
import {
	CreateTeamMemberRequestSchema,
	TeamMemberDeleteResponseSchema,
	TeamMemberResponseSchema,
	TeamMembersListResponseSchema,
	UpdateTeamMemberRequestSchema,
} from "../schemas/team.schema.ts";

const TeamMemberIdParamSchema = z.object({ id: z.string().min(1) });

openApiRegistry.register(
	"CreateTeamMemberRequest",
	CreateTeamMemberRequestSchema,
);
openApiRegistry.register(
	"UpdateTeamMemberRequest",
	UpdateTeamMemberRequestSchema,
);
openApiRegistry.register("TeamMemberResponse", TeamMemberResponseSchema);
openApiRegistry.register(
	"TeamMembersListResponse",
	TeamMembersListResponseSchema,
);
openApiRegistry.register(
	"TeamMemberDeleteResponse",
	TeamMemberDeleteResponseSchema,
);

openApiRegistry.registerPath({
	method: "get",
	path: "/api/team-members",
	tags: ["Team"],
	summary: "List all team members",
	security: [{ bearerAuth: [] }],
	responses: {
		200: {
			description: "Team members fetched successfully",
			content: {
				"application/json": { schema: TeamMembersListResponseSchema },
			},
		},
		401: {
			description: "Unauthorized",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "get",
	path: "/api/team-members/{id}",
	tags: ["Team"],
	summary: "Get team member by id",
	security: [{ bearerAuth: [] }],
	request: { params: TeamMemberIdParamSchema },
	responses: {
		200: {
			description: "Team member fetched successfully",
			content: { "application/json": { schema: TeamMemberResponseSchema } },
		},
		404: {
			description: "Team member not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "post",
	path: "/api/team-members",
	tags: ["Team"],
	summary: "Create a team member",
	security: [{ bearerAuth: [] }],
	request: {
		body: {
			required: true,
			content: {
				"multipart/form-data": { schema: CreateTeamMemberRequestSchema },
			},
		},
	},
	responses: {
		201: {
			description: "Team member created successfully",
			content: { "application/json": { schema: TeamMemberResponseSchema } },
		},
		400: {
			description: "Validation error",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
		401: {
			description: "Unauthorized",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "patch",
	path: "/api/team-members/{id}",
	tags: ["Team"],
	summary: "Update a team member",
	security: [{ bearerAuth: [] }],
	request: {
		params: TeamMemberIdParamSchema,
		body: {
			required: true,
			content: {
				"multipart/form-data": { schema: UpdateTeamMemberRequestSchema },
			},
		},
	},
	responses: {
		200: {
			description: "Team member updated successfully",
			content: { "application/json": { schema: TeamMemberResponseSchema } },
		},
		404: {
			description: "Team member not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

openApiRegistry.registerPath({
	method: "delete",
	path: "/api/team-members/{id}",
	tags: ["Team"],
	summary: "Delete a team member",
	security: [{ bearerAuth: [] }],
	request: { params: TeamMemberIdParamSchema },
	responses: {
		200: {
			description: "Team member deleted successfully",
			content: {
				"application/json": { schema: TeamMemberDeleteResponseSchema },
			},
		},
		404: {
			description: "Team member not found",
			content: { "application/json": { schema: ApiErrorSchema } },
		},
	},
});

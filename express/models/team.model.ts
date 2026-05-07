export type TeamMemberGroup =
	| "leadership"
	| "engineering-design"
	| "product-operations";

export type TeamMember = {
	id: string;
	name: string;
	position: string;
	group?: TeamMemberGroup;
	shortDescription?: string;
	detailedDescription?: string;
	profileImageUrl?: string;
	email?: string;
	phone?: string;
	linkedinUrl?: string;
	twitterUrl?: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateTeamMemberRequest = Omit<
	TeamMember,
	"id" | "createdAt" | "updatedAt"
>;

export type UpdateTeamMemberRequest = Partial<CreateTeamMemberRequest>;

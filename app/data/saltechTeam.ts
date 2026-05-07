import { saltechAssets } from "@/data/saltechAssets";

export type SaltechTeamMember = {
	id: string;
	name: string;
	position: string;
	groupId: "leadership" | "engineering-design" | "product-operations";
	groupLabel: string;
	headline: string;
	image: string;
	linkedin?: string;
	twitter?: string;
	email?: string;
};

export const TEAM_GROUPS: Array<{
	id: SaltechTeamMember["groupId"];
	eyebrow: string;
	title: string;
	description: string;
	accent?: "plain" | "tint";
}> = [
	{
		id: "leadership",
		eyebrow: "Leadership",
		title: "Vision, strategy, and accountability.",
		description:
			"The founders and executives who set direction and stay in the room until the product ships.",
		accent: "plain",
	},
	{
		id: "engineering-design",
		eyebrow: "Engineering & Design",
		title: "The craft behind every product.",
		description:
			"Senior engineers and designers who have built systems at scale - inside the regulated environments we now build for.",
		accent: "tint",
	},
	{
		id: "product-operations",
		eyebrow: "Product & Operations",
		title: "Delivery, data, and quality.",
		description:
			"The team that keeps everything on track - from your first sprint to your last deployment.",
		accent: "plain",
	},
];

export const SALTECH_TEAM_MEMBERS: SaltechTeamMember[] = [
	{
		id: "odunayo-hassan",
		name: "Odunayo Hassan",
		position: "Vice President",
		groupId: "leadership",
		groupLabel: "Leadership",
		headline:
			"Product strategy, enterprise partnerships, and delivery governance.",
		image: saltechAssets.odunayoPortrait,
		linkedin: "#",
		twitter: "#",
		email: "mailto:team@saltech.africa",
	},
	{
		id: "zainab-abdullahi",
		name: "Zainab Abdullahi",
		position: "Chief of Staff",
		groupId: "leadership",
		groupLabel: "Leadership",
		headline:
			"Cross-functional execution and operational alignment across teams.",
		image: saltechAssets.odunayoPortrait,
		linkedin: "#",
		twitter: "#",
		email: "mailto:team@saltech.africa",
	},
	{
		id: "emmanuel-uchewa",
		name: "Emmanuel Uchewa",
		position: "Lead Backend Engineer",
		groupId: "engineering-design",
		groupLabel: "Engineering & Design",
		headline: "Platform architecture and high-throughput backend systems.",
		image: saltechAssets.odunayoPortrait,
		linkedin: "#",
		twitter: "#",
		email: "mailto:team@saltech.africa",
	},
	{
		id: "chimdi-nze",
		name: "Chimdi Nze",
		position: "Senior Frontend Engineer",
		groupId: "engineering-design",
		groupLabel: "Engineering & Design",
		headline: "Design system implementation, accessibility, and performance.",
		image: saltechAssets.odunayoPortrait,
		linkedin: "#",
		twitter: "#",
		email: "mailto:team@saltech.africa",
	},
	{
		id: "aishat-akanu",
		name: "Aishat Akanu",
		position: "Design Director",
		groupId: "engineering-design",
		groupLabel: "Engineering & Design",
		headline:
			"Product design direction across research, interaction, and brand.",
		image: saltechAssets.odunayoPortrait,
		linkedin: "#",
		twitter: "#",
		email: "mailto:team@saltech.africa",
	},
	{
		id: "omolade-sunday",
		name: "Omolade Sunday",
		position: "Vice President",
		groupId: "engineering-design",
		groupLabel: "Engineering & Design",
		headline: "Technical leadership and execution standards across squads.",
		image: saltechAssets.odunayoPortrait,
		linkedin: "#",
		twitter: "#",
		email: "mailto:team@saltech.africa",
	},
	{
		id: "onyekachi-aju",
		name: "Onyekachi Aju",
		position: "Senior Product Manager",
		groupId: "product-operations",
		groupLabel: "Product & Operations",
		headline: "Roadmapping, customer discovery, and sprint execution.",
		image: saltechAssets.odunayoPortrait,
		linkedin: "#",
		twitter: "#",
		email: "mailto:team@saltech.africa",
	},
	{
		id: "collins-akinlabi",
		name: "Collins Timileyin Akinlabi",
		position: "QA Lead",
		groupId: "product-operations",
		groupLabel: "Product & Operations",
		headline: "Quality strategy, release readiness, and test automation.",
		image: saltechAssets.odunayoPortrait,
		linkedin: "#",
		twitter: "#",
		email: "mailto:team@saltech.africa",
	},
];

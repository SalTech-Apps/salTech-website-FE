import { Link } from "react-router";
import { Button } from "@heroui/react";
import { FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { Hero } from "@/components/ui/Hero";
import { saltechAssets } from "@/data/saltechAssets";
import { SALTECH_TEAM_MEMBERS, TEAM_GROUPS } from "@/data/saltechTeam";

function TeamMemberCard({
	name,
	position,
	image,
	linkedin,
	twitter,
	email,
}: {
	name: string;
	position: string;
	image: string;
	linkedin?: string;
	twitter?: string;
	email?: string;
}) {
	return (
		<article className="overflow-hidden rounded-xl border border-[#E9E9E9] bg-white shadow-[0_8px_30px_-20px_rgba(17,24,39,0.45)]">
			<img
				src={image}
				alt={`${name}, ${position} at SalTech`}
				className="h-66 w-full object-cover object-top"
			/>
			<div className="bg-[#E2BA51] px-3 py-3 text-center text-[#111827]">
				<p className="text-xs font-bold uppercase tracking-wide">{name}</p>
				<p className="mt-1 text-[11px] font-medium">{position}</p>
				<div className="mt-2 flex justify-center gap-3 text-sm text-[#111827]/90">
					{linkedin ? (
						<a href={linkedin} aria-label={`${name} on LinkedIn`}>
							<FiLinkedin />
						</a>
					) : null}
					{twitter ? (
						<a href={twitter} aria-label={`${name} on Twitter`}>
							<FiTwitter />
						</a>
					) : null}
					{email ? (
						<a href={email} aria-label={`Email ${name}`}>
							<FiMail />
						</a>
					) : null}
				</div>
			</div>
		</article>
	);
}

export default function SaltechTeam() {
	return (
		<div className="bg-[#F8F8F8]">
			<Hero
				eyebrow={
					<span className="inline-flex rounded-full bg-[#E2BA511A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-gold backdrop-blur-sm">
						MEET THE TEAM
					</span>
				}
				title="The people who actually build your product."
				subtitle="No outsourcing. No hand-offs to juniors. The team you meet in the first call is the team that ships your product."
				backgroundImage={saltechAssets.aboutHero}
				overlay="dark"
				size="full"
				backgroundBlur
				titleVariant="white"
				showDivider={false}
				contentMaxWidth="wide"
			/>

			{TEAM_GROUPS.map((group) => {
				const members = SALTECH_TEAM_MEMBERS.filter(
					(member) => member.groupId === group.id,
				);

				return (
					<section
						key={group.id}
						className={group.accent === "tint" ? "bg-[#F2F0EA] py-20" : "bg-[#F8F8F8] py-20"}
					>
						<div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-12 lg:px-8">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B78F2C]">
									{group.eyebrow}
								</p>
								<h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] text-[#111827]">
									{group.title}
								</h2>
								<p className="mt-4 max-w-xl text-base leading-7 text-[#6B7280]">
									{group.description}
								</p>
							</div>
							<div
								className={
									members.length > 3
										? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
										: "grid grid-cols-1 gap-4 sm:grid-cols-2"
								}
							>
								{members.map((member) => (
									<TeamMemberCard
										key={member.id}
										name={member.name}
										position={member.position}
										image={member.image}
										linkedin={member.linkedin}
										twitter={member.twitter}
										email={member.email}
									/>
								))}
							</div>
						</div>
					</section>
				);
			})}

			<section className="bg-[#F8F8F8] pb-20">
				<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="rounded-[28px] bg-[#0A1733] px-6 py-8 shadow-[0_16px_40px_-28px_rgba(10,23,51,1)] sm:px-10 sm:py-10">
						<div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
							<div>
								<p className="inline-flex rounded-full bg-[#E2BA51]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E2BA51]">
									WE'RE HIRING
								</p>
								<h3 className="mt-4 font-heading text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-tight text-white">
									Want to build with this team?
								</h3>
								<p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
									We're looking for engineers, designers, and PMs who care about craft and want to work on systems that matter.
								</p>
							</div>
							<div>
								<Link to="/career" prefetch="intent">
									<Button className="h-12 rounded-xl bg-[#E2BA51] px-6 font-semibold text-[#1F2534] hover:bg-[#D6AC3E]">
										See Open Roles
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

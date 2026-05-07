import { useMemo } from "react";
import { Link } from "react-router";
import { Button, Table } from "@heroui/react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiUsers } from "react-icons/fi";
import {
	ConsolePageHeader,
	ConsolePanel,
	ConsoleStatCard,
} from "@/components/console/ConsoleShared";
import { SALTECH_TEAM_MEMBERS, TEAM_GROUPS } from "@/data/saltechTeam";

export default function ConsoleTeamPage() {
	const allMembers = useMemo(
		() =>
			SALTECH_TEAM_MEMBERS.map((member) => ({
				...member,
				groupLabel:
					TEAM_GROUPS.find((g) => g.id === member.groupId)?.eyebrow ?? "",
			})),
		[],
	);

	return (
		<div className="mx-auto flex w-full max-w-290 flex-col gap-6 px-0 lg:px-6 lg:py-2">
			<ConsolePageHeader
				title="Team"
				description="Manage team profiles shown on the public team page."
				action={
					<Button className="h-11 rounded-xl bg-[#E2BA51] px-5 font-semibold text-[#1F2534]">
						<span className="inline-flex items-center gap-2">
							<FiPlus />
							Add Team Member
						</span>
					</Button>
				}
			/>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<ConsoleStatCard
					label="Total Members"
					value={SALTECH_TEAM_MEMBERS.length}
					change="Dummy source for now"
					icon={FiUsers}
					tone="gold"
				/>
				<ConsoleStatCard
					label="Leadership"
					value={
						SALTECH_TEAM_MEMBERS.filter((m) => m.groupId === "leadership")
							.length
					}
					change="Public profile group"
					icon={FiUsers}
					tone="green"
				/>
				<ConsoleStatCard
					label="Engineering & Design"
					value={
						SALTECH_TEAM_MEMBERS.filter(
							(m) => m.groupId === "engineering-design",
						).length
					}
					change="Public profile group"
					icon={FiUsers}
					tone="blue"
				/>
				<ConsoleStatCard
					label="Product & Operations"
					value={
						SALTECH_TEAM_MEMBERS.filter(
							(m) => m.groupId === "product-operations",
						).length
					}
					change="Public profile group"
					icon={FiUsers}
					tone="orange"
				/>
			</div>

			<ConsolePanel>
				<div className="border-b border-[#ECE8DF] px-6 py-5">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<h2 className="font-heading text-[2rem] font-semibold text-[#1F2534]">
							Team Members
						</h2>
						<div className="w-full max-w-sm">
							<div className="flex h-11 items-center gap-2 rounded-xl border border-[#E6E2D9] bg-white px-3">
								<FiSearch className="text-[#8A90A0]" />
								<input
									readOnly
									placeholder="Search (UI only for now)"
									className="h-full w-full border-none bg-transparent text-sm text-[#8A90A0] outline-none"
								/>
							</div>
						</div>
					</div>
				</div>

				<Table variant="secondary">
					<Table.ScrollContainer>
						<Table.Content aria-label="Team members" className="min-w-175">
							<Table.Header className="bg-[#FBF7EE]">
								<Table.Column
									isRowHeader
									className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]"
								>
									Name
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Position
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Group
								</Table.Column>
								<Table.Column className="text-xs font-semibold uppercase tracking-[0.08em] text-[#858B9B]">
									Actions
								</Table.Column>
							</Table.Header>
							<Table.Body
								renderEmptyState={() => (
									<div className="py-10 text-center text-sm text-[#8D92A1]">
										No team members found.
									</div>
								)}
							>
								{allMembers.map((member) => (
									<Table.Row key={member.id}>
										<Table.Cell className="font-medium text-[#1F2534]">
											{member.name}
										</Table.Cell>
										<Table.Cell className="text-sm text-[#5F6677]">
											{member.position}
										</Table.Cell>
										<Table.Cell>
											<span className="text-xs font-semibold uppercase tracking-widest text-[#B38D2A]">
												{member.groupLabel}
											</span>
										</Table.Cell>
										<Table.Cell>
											<div className="flex items-center gap-2">
												<Button
													variant="secondary"
													className="h-9 rounded-xl border border-[#E5E1D8] bg-white px-3 text-[#434959]"
												>
													<span className="inline-flex items-center gap-2">
														<FiEdit2 size={14} />
														Edit
													</span>
												</Button>
												<Button className="h-9 rounded-xl bg-[#FFF0F0] px-3 text-[#C42D2D]">
													<span className="inline-flex items-center gap-2">
														<FiTrash2 size={14} />
														Delete
													</span>
												</Button>
											</div>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Content>
					</Table.ScrollContainer>
				</Table>
			</ConsolePanel>

			<div className="rounded-[22px] border border-[#E6E2D9] bg-[#FAF7F0] px-6 py-5 text-sm text-[#6E7586]">
				This page currently uses dummy team data. API routes for create, update,
				and delete are scaffolded on the server and can be wired later.
				<Link
					className="ml-1 font-semibold text-[#1F2534] underline"
					to="/team"
				>
					Preview public team page
				</Link>
			</div>
		</div>
	);
}

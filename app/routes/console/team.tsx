import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Table } from "@heroui/react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiUsers } from "react-icons/fi";
import {
	deleteApiTeamMembersById,
	getApiTeamMembers,
	type GetApiTeamMembersResponse,
} from "@/client";
import {
	ConsolePageHeader,
	ConsolePanel,
	ConsoleStatCard,
} from "@/components/console/ConsoleShared";

type TeamMember = GetApiTeamMembersResponse["data"][number];

const GROUP_LABELS: Record<string, string> = {
	leadership: "Leadership",
	"engineering-design": "Engineering & Design",
	"product-operations": "Product & Operations",
};

function SkeletonRows() {
	return (
		<>
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className="flex gap-4 border-b border-[#ECE8DF] px-5 py-4">
					{Array.from({ length: 4 }).map((_, j) => (
						<div
							key={j}
							className="h-4 flex-1 animate-pulse rounded-md bg-[#ECE8DF]"
							style={{ maxWidth: j === 3 ? "120px" : undefined }}
						/>
					))}
				</div>
			))}
		</>
	);
}

export default function ConsoleTeamPage() {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");

	const teamQuery = useQuery({
		queryKey: ["console-team"],
		queryFn: async () => {
			const response = await getApiTeamMembers({ throwOnError: true });
			return response.data.data;
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			await deleteApiTeamMembersById({ throwOnError: true, path: { id } });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["console-team"] });
		},
	});

	const allMembers: TeamMember[] = teamQuery.data ?? [];

	const filtered = useMemo(() => {
		const q = search.toLowerCase().trim();
		if (!q) return allMembers;
		return allMembers.filter(
			(m) =>
				m.name.toLowerCase().includes(q) ||
				m.position.toLowerCase().includes(q),
		);
	}, [allMembers, search]);

	const leadershipCount = allMembers.filter(
		(m) => m.group === "leadership",
	).length;
	const engCount = allMembers.filter(
		(m) => m.group === "engineering-design",
	).length;
	const opsCount = allMembers.filter(
		(m) => m.group === "product-operations",
	).length;

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
					value={allMembers.length}
					icon={FiUsers}
					tone="gold"
				/>
				<ConsoleStatCard
					label="Leadership"
					value={leadershipCount}
					icon={FiUsers}
					tone="green"
				/>
				<ConsoleStatCard
					label="Engineering & Design"
					value={engCount}
					icon={FiUsers}
					tone="blue"
				/>
				<ConsoleStatCard
					label="Product & Operations"
					value={opsCount}
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
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="Search by name or position"
									className="h-full w-full border-none bg-transparent text-sm text-[#1F2534] outline-none placeholder:text-[#8A90A0]"
								/>
							</div>
						</div>
					</div>
				</div>

				{teamQuery.isPending ? (
					<SkeletonRows />
				) : (
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
											{teamQuery.isError
												? "Failed to load team members."
												: "No team members found."}
										</div>
									)}
								>
									{filtered.map((member) => (
										<Table.Row key={member.id}>
											<Table.Cell className="font-medium text-[#1F2534]">
												{member.name}
											</Table.Cell>
											<Table.Cell className="text-sm text-[#5F6677]">
												{member.position}
											</Table.Cell>
											<Table.Cell>
												<span className="text-xs font-semibold uppercase tracking-widest text-[#B38D2A]">
													{member.group
														? (GROUP_LABELS[member.group] ?? member.group)
														: "—"}
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
													<Button
														className="h-9 rounded-xl bg-[#FFF0F0] px-3 text-[#C42D2D]"
														isLoading={
															deleteMutation.isPending &&
															deleteMutation.variables === member.id
														}
														onPress={() => deleteMutation.mutate(member.id)}
													>
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
				)}
			</ConsolePanel>
		</div>
	);
}

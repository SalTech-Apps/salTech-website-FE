export type AboutValue = {
  id: string;
  title: string;
  body: string;
};

export const ABOUT_MISSION_STATS: Array<{ value: string; label: string }> = [
  { value: "20k+", label: "Products shipped" },
  { value: "12+", label: "Gov contracts" },
  { value: "8 weeks", label: "Typical MVP" },
  { value: "3", label: "In operation" },
  { value: "14", label: "Countries reached" },
];

export const ABOUT_VALUES: AboutValue[] = [
  {
    id: "execution",
    title: "Execution over promises",
    body: "We ship in milestones you can verify — demos, environments, and documentation you can hand to an auditor or investor without rewriting the story.",
  },
  {
    id: "security",
    title: "Security by default",
    body: "Privacy and resilience are part of the first sketch, not a late add-on. That means fewer surprises when traffic, regulators, or attackers show up.",
  },
  {
    id: "honesty",
    title: "Honesty about tradeoffs",
    body: "Fast, cheap, perfect — pick two. We explain what each choice costs in time, money, and risk so you can decide with clear eyes.",
  },
  {
    id: "lasting",
    title: "Products that last",
    body: "We optimize for systems that stay maintainable under load: observability, clear boundaries, and code the next team can actually own.",
  },
];

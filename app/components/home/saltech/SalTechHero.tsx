import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/Reveal";
import { homePageAssets } from "@/data/homePageAssets";

/** Home hero — matches marketing hero spec (gold accent, topo background). */
const GOLD = "#E5C05E";
const INK = "#1A1C20";
const MUTED = "#71717A";

export function SalTechHero() {
	return (
		<section className="relative overflow-hidden bg-white pb-16 pt-14 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
			{/* Grayscale keeps line art neutral (source asset can read blue-gray on some displays / after CDN encode). */}
			<div
				className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] grayscale"
				style={{ backgroundImage: `url(${homePageAssets.topoPattern})` }}
				aria-hidden
			/>

			<FadeIn className="relative mx-auto flex max-w-4xl flex-col items-center gap-7 px-4 text-center sm:gap-9">
				<div className="inline-flex items-center rounded-full bg-[#FAF3DC] px-4 py-1.5">
					<p className="font-saltech-display text-[13px] font-semibold tracking-wide text-[#7A5E10] inline-flex items-center gap-1">
						<span className="bg-[#E2BA51] h-2 w-2 rounded-full" />
						<span>Enterprise-Grade. Startup-Speed.</span>
					</p>
				</div>

				<h1 className="font-saltech-display text-4xl font-semibold leading-[1.12] tracking-tight text-[#1A1C20] md:text-5xl md:leading-[1.1] lg:text-[56px] lg:leading-[1.08]">
					<span className="block">Build products </span> that{" "}
					<span className="inline-block" style={{ color: GOLD }}>
						scale
					</span>
					<span className=""> from day one.</span>
				</h1>

				<p className="max-w-xl text-base leading-7 text-[#71717A] md:text-[17px] md:leading-6.75">
					SalTech engineers mission-critical digital products for startups,
					enterprises, and government organizations. From MVP to
					production-grade infrastructure — built for speed, designed for scale.
				</p>

				<div className="grid grid-cols-2 gap-4 pt-2">
					<Link
						to="/contact"
						prefetch="intent"
						className="inline-flex  items-center justify-center rounded-[14px] px-9 py-4 text-[15px] font-semibold shadow-[0_10px_30px_rgba(229,192,94,0.18)] transition-all hover:-translate-y-px hover:opacity-100"
						style={{ backgroundColor: GOLD, color: INK }}
					>
						Start a Project →
					</Link>
					<Link
						to="/case-studies"
						prefetch="intent"
						className="inline-flex  items-center justify-center rounded-[14px] border border-neutral-300 bg-transparent px-9 py-4 text-[15px] font-semibold text-[#1A1C20] transition-colors"
						// [#E5E7EB] border color
					>
						View Case Studies
					</Link>
				</div>

				<div className="mt-6 w-full px-2">
					<div className="grid gap-0 overflow-hidden sm:grid-cols-3">
						<div className="flex min-h-[92px] flex-col items-start px-6 sm:border-r sm:border-neutral-300">
							<p
								className="text-3xl font-bold tracking-tight md:text-[34px]"
								style={{ color: INK }}
							>
								50+
							</p>
							<p className="mt-1 text-xs leading-none" style={{ color: MUTED }}>
								Products launched
							</p>
						</div>

						<p
							className="flex min-h-[92px] items-center justify-center px-8 text-center text-xs leading-snug sm:border-r sm:border-neutral-300"
							style={{ color: MUTED }}
						>
							Trusted by startups & enterprises
						</p>

						<p
							className="flex min-h-[92px] items-center justify-center px-8 text-center text-xs leading-snug"
							style={{ color: MUTED }}
						>
							Government-certified partners
						</p>
					</div>
				</div>
			</FadeIn>
		</section>
	);
}

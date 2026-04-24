import {
	CareerPageHero,
	WhySalTechSection,
	CurrentOpeningsSection,
} from "@/components/saltech/career";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo";
import { webPageSchema } from "@/lib/jsonld";
import { buildMetaTags } from "@/lib/seo";

export function meta({ location }: { location: { pathname: string } }) {
	return buildMetaTags({
		title: "Careers",
		description:
			"Join SalTech and build mission-critical digital products for Africa. We're hiring engineers, designers, and business developers.",
		path: location.pathname,
	});
}

export default function CareerPage() {
	return (
		<div className="flex w-full flex-col">
			<JsonLd
				data={webPageSchema({
					name: "Careers at SalTech",
					description:
						"Join our team and build the infrastructure that powers Africa's digital future.",
					path: "/careers",
				})}
			/>
			<CareerPageHero />
			<Reveal>
				<WhySalTechSection />
			</Reveal>
			<Reveal>
				<CurrentOpeningsSection />
			</Reveal>
		</div>
	);
}

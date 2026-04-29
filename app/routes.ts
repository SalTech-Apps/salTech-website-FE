import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	route("favicon.ico", "routes/favicon[.]ico.tsx"),
	route("api/health", "routes/api.health.tsx"),
	route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
	route("sw.js", "routes/sw[.]js.tsx"),
	layout("layouts/MainLayout.tsx", [
		index("routes/home/index.tsx"),
		route("services", "routes/services/index.tsx"),
		route("case-studies", "routes/case-studies/index.tsx"),
		route("about", "routes/about/index.tsx"),
		route("contact", "routes/contact/index.tsx"),
		route("health", "routes/health/index.tsx"),
		route("projects", "routes/projects/index.tsx"),
		route("career", "routes/career/index.tsx"),
		route("career/:jobId", "routes/career/$jobId.tsx"),
		route("career/:jobId/success", "routes/career/$jobId.success.tsx"),
		route("terms", "routes/terms/index.tsx"),
		route("privacy", "routes/privacy/index.tsx"),
		route("page/:slug", "routes/page/$slug.tsx"),
	]),
	route("console", "layouts/ConsoleLayout.tsx", [
		index("routes/console/index.tsx"),
		route("jobs", "routes/console/jobs.tsx"),
		route("jobs/new", "routes/console/jobs.new.tsx"),
		route("jobs/:jobId/edit", "routes/console/jobs.edit.tsx"),
		route("drafts", "routes/console/drafts.tsx"),
		route("candidates", "routes/console/candidates.tsx"),
		route("settings", "routes/console/settings.tsx"),
	]),
	route("login", "routes/login/index.tsx"),
] satisfies RouteConfig;

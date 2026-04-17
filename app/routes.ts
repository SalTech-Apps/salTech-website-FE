import {
    type RouteConfig,
    index,
    layout,
    route,
  } from "@react-router/dev/routes";
  
  export default [
    route("favicon.ico", "routes/favicon[.]ico.tsx"),
    route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
    route("sw.js", "routes/sw[.]js.tsx"),
    layout("layouts/MainLayout.tsx", [
      index("routes/home/index.tsx"),
      route("services", "routes/services/index.tsx"),
      route("case-studies", "routes/case-studies/index.tsx"),
      route("about", "routes/about/index.tsx"),
      route("contact", "routes/contact/index.tsx"),
      route("projects", "routes/projects/index.tsx"),

      route("terms", "routes/terms/index.tsx"),
      route("privacy", "routes/privacy/index.tsx"),
      route("page/:slug", "routes/page/$slug.tsx"),
    ]),
    route("console", "layouts/ConsoleLayout.tsx", []),
  ] satisfies RouteConfig;
  
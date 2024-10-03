export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SalTech",
  description: "Rapid Prototype Company",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Who we are",
      href: "/about",
    },
    {
      label: "Careers",
      href: "/careers",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ],
  footerLinks: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

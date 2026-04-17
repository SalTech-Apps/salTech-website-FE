import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button, Input, Spinner } from "@heroui/react";
import type { User } from "firebase/auth";
import { signIn, signOut, onAuthChange, isAdminEmail } from "@/lib/auth";
import {
  IoHomeOutline,
  IoBusinessOutline,
  IoChatbubblesOutline,
  IoBookOutline,
  IoDocumentTextOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoSettingsOutline,
  IoMailOutline,
  IoPeopleOutline,
  IoConstructOutline,
  IoHeartOutline,
  IoHomeSharp,
  IoStarOutline,
} from "react-icons/io5";

export function meta() {
  return [{ name: "robots", content: "noindex, nofollow" }];
}

const NAV_ITEMS = [
  { to: "/console", label: "Dashboard", icon: IoHomeOutline, exact: true },
  { to: "/console/properties", label: "Properties", icon: IoBusinessOutline },
  { to: "/console/off-plan", label: "Off-Plan", icon: IoHomeSharp },
  { to: "/console/off-plan-wishlist", label: "Off-Plan Wishlist", icon: IoHeartOutline },
  { to: "/console/projects", label: "Projects", icon: IoConstructOutline },
  { to: "/console/consultations", label: "Consultations", icon: IoChatbubblesOutline },
  { to: "/console/reviews", label: "Reviews", icon: IoStarOutline },
  { to: "/console/insights", label: "Insights", icon: IoBookOutline },
  { to: "/console/pages", label: "Pages", icon: IoDocumentTextOutline },
  { to: "/console/newsletter", label: "Newsletter", icon: IoMailOutline },
  { to: "/console/team", label: "Team", icon: IoPeopleOutline },
  { to: "/console/config", label: "Configuration", icon: IoSettingsOutline },
  { to: "/console/experience-study", label: "Experience Study", icon: IoDocumentTextOutline },
];

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-main-background">
      <div className="w-full max-w-md rounded-xl border border-soft-divider-line bg-secondary-background p-8">
        <h1 className="mb-2 text-center font-heading text-heading-h2 text-main-text-headlines">
          Saltech Console
        </h1>
        <p className="mb-8 text-center text-body text-secondary-text-body-paragraphs">
          Sign in to manage your site
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            classNames={{
              input: "text-main-text-headlines",
              inputWrapper:
                "bg-main-background border border-soft-divider-line",
            }}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            classNames={{
              input: "text-main-text-headlines",
              inputWrapper:
                "bg-main-background border border-soft-divider-line",
            }}
            required
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button
            radius="none"
            type="submit"
            isLoading={loading}
            className="bg-primary-gold text-main-background font-semibold"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ConsoleLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      setUser(u && isAdminEmail(u.email) ? u : null);
      setChecking(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-main-background">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  function isActive(to: string, exact?: boolean) {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  }

  return (
    <div className="flex min-h-screen bg-main-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh max-h-dvh w-64 shrink-0 flex-col border-r border-soft-divider-line bg-secondary-background transition-transform lg:static lg:self-start lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-soft-divider-line px-6">
          <Link
            to="/console"
            prefetch="intent"
            className="font-heading text-xl text-primary-gold"
          >
            SalTech Console
          </Link>
          <button
            className="lg:hidden text-muted-labels"
            onClick={() => setSidebarOpen(false)}
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  prefetch="intent"
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.to, item.exact)
                      ? "bg-primary-gold/10 text-primary-gold"
                      : "text-secondary-text-body-paragraphs hover:bg-main-background hover:text-main-text-headlines"
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-soft-divider-line p-4">
          <p className="mb-2 truncate text-xs text-muted-labels">
            {user.email}
          </p>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-secondary-text-body-paragraphs hover:bg-main-background hover:text-red-400 transition-colors"
          >
            <IoLogOutOutline size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-soft-divider-line px-6 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-labels"
          >
            <IoMenuOutline size={24} />
          </button>
          <span className="font-heading text-lg text-primary-gold">
            SalTech Console
          </span>
        </header>

        <main className="flex-1 max-h-dvh overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

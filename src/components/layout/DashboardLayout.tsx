import { NavLink, useLocation } from "react-router-dom";
import { Activity, BarChart3, Clock, Send, Fuel, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/transactions", label: "History", icon: Clock },
  { to: "/schedule", label: "Schedule", icon: Send },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-green">
              <Fuel className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Gas Ninja Bot</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">BNB Chain • Autonomous</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
              <div className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
              <span className="text-xs font-medium text-muted-foreground">Agent Active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6">{children}</main>
    </div>
  );
}

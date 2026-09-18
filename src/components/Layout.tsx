import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Compass,
  Users,
  ListChecks,
  GitBranch,
  GitPullRequest,
  Server,
  Plug,
  FlaskConical,
  AlertTriangle,
  Timer,
  Mic,
  BookOpen,
  Search,
  Library,
  Rocket,
  Menu,
  X,
  RotateCcw,
  ClipboardList,
  Radio,
  ScrollText,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "../store";
import { PHASES } from "../data/phases";
import { ClockPill } from "./ClockPill";

const NAV = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/prep", label: "Prep Checklist", icon: ClipboardList },
  { to: "/current-phase", label: "Current Phase", icon: Compass },
  { to: "/team", label: "Team", icon: Users },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/github-setup", label: "Branches", icon: GitBranch },
  { to: "/pull-requests", label: "Pull Requests", icon: GitPullRequest },
  { to: "/server", label: "Server", icon: Server },
  { to: "/api-contract", label: "API Contract", icon: Plug },
  { to: "/testing", label: "Testing", icon: FlaskConical },
  { to: "/pulse", label: "Team Pulse", icon: Radio },
  { to: "/decisions", label: "Decisions", icon: ScrollText },
  { to: "/emergency", label: "Emergency", icon: AlertTriangle },
  { to: "/final-hours", label: "Final Hours", icon: Timer },
  { to: "/demo", label: "Demo", icon: Mic },
  { to: "/cheatsheet", label: "Git Cheat Sheet", icon: BookOpen },
  { to: "/what-now", label: "What Do I Run?", icon: Search },
  { to: "/resources", label: "Resources", icon: Library },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const overall = useStore((s) => s.overallProgress());

  return (
    <div className="min-h-screen lg:flex">
      <button
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden fixed top-3 right-3 z-50 rounded-md border border-base-700 bg-base-900 p-2 text-base-200"
        aria-label="Toggle menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 border-r border-base-800 bg-base-900/95 backdrop-blur transform transition-transform lg:transform-none ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-5 py-5 border-b border-base-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-signal-phase/15 text-signal-phase">
              <Rocket size={17} />
            </div>
            <div>
              <div className="font-display text-sm font-semibold tracking-tight text-base-100">CFG Command Center</div>
              <div className="text-[11px] text-base-400">Code for Good prep</div>
            </div>
          </div>

          <ClockPill />

          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-signal-info/12 text-signal-info font-medium"
                      : "text-base-300 hover:bg-base-800 hover:text-base-100"
                  }`
                }
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-base-800 px-4 py-4">
            <div className="flex items-center justify-between text-xs text-base-400 mb-1.5">
              <span>Overall progress</span>
              <span className="font-mono text-base-200">{overall}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-base-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-signal-phase transition-all duration-500"
                style={{ width: `${overall}%` }}
              />
            </div>
            <ResetButton />
          </div>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function ResetButton() {
  const resetAll = useStore((s) => s.resetAll);
  return (
    <button
      onClick={() => {
        if (window.confirm("Reset all hackathon progress? This clears team, tasks, checklists, and everything else stored locally.")) {
          resetAll();
        }
      }}
      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-base-700 px-3 py-1.5 text-xs text-base-400 hover:text-signal-danger hover:border-signal-danger/40 transition-colors"
    >
      <RotateCcw size={12} /> Reset hackathon
    </button>
  );
}

export { PHASES };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Users2, ArrowRight, ChevronRight } from "lucide-react";
import { useStore } from "../store";
import { PHASES, getPhase } from "../data/phases";
import { ProgressBar } from "../components/ProgressBar";
import { Pill } from "../components/Pill";
import { ClockCard } from "../components/ClockCard";
import { WellbeingNudge } from "../components/WellbeingNudge";

export function Dashboard() {
  const navigate = useNavigate();
  const overall = useStore((s) => s.overallProgress());
  const currentPhaseId = useStore((s) => s.currentPhaseId);
  const team = useStore((s) => s.team);
  const tasks = useStore((s) => s.tasks);
  const setCurrentPhase = useStore((s) => s.setCurrentPhase);
  const phaseProgress = useStore((s) => s.phaseProgress);
  const [reveal, setReveal] = useState(false);

  const currentPhase = getPhase(currentPhaseId) || PHASES[0];
  const inProgressTask = tasks.find((t) => t.status === "in-progress");
  const nextPhase = PHASES.find((p) => Number(p.id) === Number(currentPhase.id) + 1);

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 text-signal-phase text-xs font-mono tracking-wide mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-phase animate-pulse" />
          MISSION CONTROL
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-base-100">
          CFG Team Command Center
        </h1>
        <p className="mt-2 text-base-400 max-w-xl text-[15px]">
          The GitHub & team workflow guide for JPMorgan Chase Code for Good hackathons.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2 rounded-xl border border-base-700 bg-base-900 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-base-400">Hackathon progress</span>
            <span className="font-mono text-lg text-base-100">{overall}%</span>
          </div>
          <ProgressBar value={overall} color="phase" />
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Current phase", value: `${currentPhase.num} · ${currentPhase.title}` },
              { label: "Team", value: `${team.length} members` },
              { label: "Tasks in flight", value: `${tasks.filter((t) => t.status !== "done").length} open` },
              { label: "Next up", value: nextPhase ? nextPhase.title : "Wrap up" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[11px] uppercase tracking-wide text-base-500">{s.label}</div>
                <div className="text-sm text-base-200 mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-base-700 bg-base-900 p-5 flex flex-col">
          <div className="flex items-center gap-2 text-sm text-base-400 mb-1">
            <Users2 size={15} /> Team snapshot
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {team.slice(0, 6).map((m) => (
              <Pill key={m.id} variant="neutral">
                {m.name}
              </Pill>
            ))}
          </div>
          <button
            onClick={() => navigate("/team")}
            className="mt-auto pt-4 text-sm text-signal-info flex items-center gap-1 hover:gap-1.5 transition-all"
          >
            Manage team <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ClockCard />
        <WellbeingNudge />
      </div>

      <div className="rounded-2xl border border-signal-info/25 bg-gradient-to-br from-signal-info/[0.06] to-transparent p-6 sm:p-8">
        <button
          onClick={() => setReveal(true)}
          className="w-full flex items-center justify-between gap-4 text-left"
        >
          <div>
            <div className="flex items-center gap-2 text-signal-info text-xs font-mono tracking-wide mb-2">
              <Zap size={13} /> NEXT ACTION
            </div>
            <div className="font-display text-xl sm:text-2xl font-semibold text-base-100">
              What are we doing right now?
            </div>
          </div>
          <ArrowRight size={22} className="shrink-0 text-signal-info" />
        </button>

        {reveal && (
          <div className="mt-6 border-t border-base-700 pt-5 space-y-3">
            <div className="text-sm text-base-400">
              Based on phase {currentPhase.num} — {currentPhase.title}:
            </div>
            <div className="text-base-100 text-base">
              {inProgressTask ? (
                <>
                  Current task: <span className="font-medium">{inProgressTask.title}</span> ({inProgressTask.assignee}, on{" "}
                  <code className="font-mono text-signal-done">{inProgressTask.branch}</code>)
                </>
              ) : (
                currentPhase.goal
              )}
            </div>
            <button
              onClick={() => {
                setCurrentPhase(currentPhase.id);
                navigate(currentPhase.route);
              }}
              className="inline-flex items-center gap-1.5 rounded-md bg-signal-info/15 border border-signal-info/30 px-3.5 py-2 text-sm font-medium text-signal-info hover:bg-signal-info/25 transition-colors"
            >
              Go to {currentPhase.title} <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-base-100 mb-4">Hackathon timeline</h2>
        <div className="rounded-xl border border-base-700 bg-base-900 p-4 sm:p-5 overflow-x-auto">
          <div className="flex items-stretch gap-1 min-w-[720px]">
            {PHASES.map((p, i) => {
              const prog = phaseProgress(p.id, p.checklist.length);
              const isCurrent = p.id === currentPhase.id;
              return (
                <div key={p.id} className="flex-1 flex items-center">
                  <button
                    onClick={() => navigate(p.route)}
                    className={`flex-1 rounded-lg border px-2.5 py-3 text-left transition-colors ${
                      isCurrent
                        ? "border-signal-phase bg-signal-phase/10"
                        : prog === 100
                        ? "border-signal-done/30 bg-signal-done/[0.05]"
                        : "border-base-700 bg-base-850 hover:border-base-500"
                    }`}
                  >
                    <div
                      className={`font-mono text-[11px] mb-1 ${
                        isCurrent ? "text-signal-phase" : prog === 100 ? "text-signal-done" : "text-base-500"
                      }`}
                    >
                      {p.num}
                    </div>
                    <div className="text-[12px] font-medium leading-tight text-base-200">{p.title}</div>
                  </button>
                  {i < PHASES.length - 1 && <div className="w-3 h-px bg-base-700 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

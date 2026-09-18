import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AlertOctagon, ArrowRight, Users, GitFork as GithubIcon } from "lucide-react";
import type { Phase } from "../data/phases";
import { PHASES } from "../data/phases";
import { CommandBlock } from "./CommandBlock";
import { Checklist } from "./Checklist";
import { ProgressBar } from "./ProgressBar";
import { useStore } from "../store";
import { Pill } from "./Pill";

export function PhaseFrame({ phase, children }: { phase: Phase; children?: ReactNode }) {
  const navigate = useNavigate();
  const setCurrentPhase = useStore((s) => s.setCurrentPhase);
  const progress = useStore((s) => s.phaseProgress(phase.id, phase.checklist.length));
  const nextPhase = PHASES.find((p) => Number(p.id) === Number(phase.id) + 1);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs text-signal-phase border border-signal-phase/30 bg-signal-phase/10 rounded px-2 py-0.5">
            PHASE {phase.num} / 10
          </span>
          <Pill variant="phase">{progress}% complete</Pill>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          {phase.title}
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px] leading-relaxed">{phase.goal}</p>
        <div className="mt-4 max-w-sm">
          <ProgressBar value={progress} color="phase" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-base-700 bg-base-900 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-base-200 mb-3">
            <Users size={15} className="text-signal-info" /> Who's involved
          </div>
          <div className="flex flex-wrap gap-1.5">
            {phase.roles.map((r) => (
              <Pill key={r} variant="info">
                {r}
              </Pill>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-base-700 bg-base-900 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-base-200 mb-3">
            <GithubIcon size={15} className="text-base-300" /> GitHub actions
          </div>
          <ul className="space-y-1.5 text-sm text-base-300">
            {phase.githubActions.length === 0 && <li className="text-base-500">None for this phase.</li>}
            {phase.githubActions.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="text-base-500">–</span> {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {phase.commands.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-base-200 mb-3">Commands</h2>
          <div className="space-y-3">
            {phase.commands.map((c) => (
              <CommandBlock key={c.label} label={c.label} code={c.code} why={c.why} />
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-signal-warn/25 bg-signal-warn/[0.04] p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-signal-warn mb-2.5">
          <AlertOctagon size={15} /> Common mistakes
        </div>
        <ul className="space-y-1.5 text-sm text-base-300">
          {phase.mistakes.map((m) => (
            <li key={m} className="flex gap-2">
              <span className="text-signal-warn">–</span> {m}
            </li>
          ))}
        </ul>
      </div>

      {children}

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Checklist</h2>
        <Checklist phaseId={phase.id} items={phase.checklist} />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-base-700 bg-base-900 p-4">
        <div className="text-sm text-base-300">
          {progress === 100 ? "Phase complete." : `${progress}% of this phase's checklist done.`}
        </div>
        {nextPhase ? (
          <button
            onClick={() => {
              setCurrentPhase(nextPhase.id);
              navigate(nextPhase.route);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-signal-phase/15 border border-signal-phase/30 px-4 py-2 text-sm font-medium text-signal-phase hover:bg-signal-phase/25 transition-colors"
          >
            Next: {phase.nextLabel} <ArrowRight size={15} />
          </button>
        ) : (
          <span className="text-sm text-signal-done font-medium">{phase.nextLabel}</span>
        )}
      </div>
    </div>
  );
}

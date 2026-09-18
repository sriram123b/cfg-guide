import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import { Checklist } from "../components/Checklist";
import { Timer } from "lucide-react";

const BLOCKS = [
  {
    id: "final-3h",
    label: "3 hours left",
    color: "border-signal-info/30 bg-signal-info/[0.05]",
    items: ["Freeze major architecture changes", "Merge important PRs", "Run a full test pass", "Fix critical bugs"],
  },
  {
    id: "final-2h",
    label: "2 hours left",
    color: "border-signal-warn/30 bg-signal-warn/[0.05]",
    items: ["UI polish", "README", "Demo data", "Screenshots", "Deployment verification"],
  },
  {
    id: "final-1h",
    label: "1 hour left — FEATURE FREEZE",
    color: "border-signal-danger/30 bg-signal-danger/[0.05]",
    items: ["No new major features", "Critical bug fixes only", "Demo fixes", "Documentation", "Presentation prep"],
  },
];

export function FinalHours() {
  const phase = getPhase("08")!;

  return (
    <PhaseFrame phase={phase}>
      <div>
        <div className="flex items-center gap-2 text-signal-warn text-xs font-mono tracking-wide mb-3">
          <Timer size={13} /> COUNTDOWN
        </div>
        <div className="space-y-4">
          {BLOCKS.map((b) => (
            <div key={b.id} className={`rounded-xl border p-4 ${b.color}`}>
              <div className="font-display text-base font-semibold text-base-100 mb-3">{b.label}</div>
              <Checklist phaseId={b.id} items={b.items} />
            </div>
          ))}
        </div>
      </div>
    </PhaseFrame>
  );
}

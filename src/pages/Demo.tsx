import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import { ArrowDown, Mic } from "lucide-react";

const FLOW = ["Problem", "Who experiences it", "Our solution", "Architecture", "Key feature", "Live demo", "Impact", "Future improvements"];

const FAILURE_PLAN = [
  "Don't panic.",
  "Have screenshots or a backup video ready.",
  "Explain the expected flow.",
  "Show the architecture.",
  "Show the repository.",
  "Demonstrate another working path.",
];

export function Demo() {
  const phase = getPhase("10")!;

  return (
    <PhaseFrame phase={phase}>
      <div>
        <div className="flex items-center gap-2 text-signal-phase text-xs font-mono tracking-wide mb-3">
          <Mic size={13} /> DEMO MODE
        </div>
        <div className="rounded-xl border border-base-700 bg-base-900 p-6">
          <div className="flex flex-col items-center gap-1">
            {FLOW.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="rounded-lg border border-signal-phase/30 bg-signal-phase/[0.06] px-4 py-2 text-sm font-medium text-base-200">
                  {step}
                </div>
                {i < FLOW.length - 1 && <ArrowDown size={14} className="text-base-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-signal-danger/25 bg-signal-danger/[0.04] p-5">
        <h2 className="text-sm font-medium text-signal-danger mb-3">If the live demo breaks</h2>
        <ol className="list-decimal list-inside space-y-1.5 text-sm text-base-300">
          {FAILURE_PLAN.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ol>
      </div>
    </PhaseFrame>
  );
}

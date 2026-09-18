import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import { useStore } from "../store";
import { Checklist } from "../components/Checklist";

export function Testing() {
  const phase = getPhase("07")!;
  const tasks = useStore((s) => s.tasks);
  const flowItems = tasks.filter((t) => t.status !== "done" || true).map((t) => `End-to-end: ${t.title}`);

  return (
    <PhaseFrame phase={phase}>
      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">End-to-end test per critical flow</h2>
        <p className="text-sm text-base-400 mb-3">One checkbox per feature your team is building — check it off only after clicking through it yourself.</p>
        <Checklist phaseId="e2e-testing" items={flowItems} />
      </div>
    </PhaseFrame>
  );
}

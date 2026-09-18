import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import { Checklist } from "../components/Checklist";

const ITEMS = [
  "main builds",
  "Latest changes merged",
  "No important uncommitted work",
  "No broken PRs",
  "No exposed API keys",
  ".env ignored",
  "README complete",
  "Setup instructions work",
  "Dependencies documented",
  "Demo works",
  "Repository is organized",
  "Unnecessary files removed",
];

export function FinalChecklist() {
  const phase = getPhase("09")!;

  return (
    <PhaseFrame phase={phase}>
      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Final GitHub check</h2>
        <Checklist phaseId="final-github-check" items={ITEMS} />
      </div>
    </PhaseFrame>
  );
}

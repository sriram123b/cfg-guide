import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import { CommandBlock } from "../components/CommandBlock";
import { GitBranch, ShieldCheck, UserPlus2 } from "lucide-react";

export function GithubSetup() {
  const phase = getPhase("04")!;

  return (
    <PhaseFrame phase={phase}>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-base-700 bg-base-900 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-base-200 mb-2">
            <GitBranch size={15} className="text-signal-info" /> Step 1 — Create repository
          </div>
          <p className="text-sm text-base-300">Name it clearly, add a README, a .gitignore for your stack, and a LICENSE if your event requires one.</p>
        </div>
        <div className="rounded-xl border border-base-700 bg-base-900 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-base-200 mb-2">
            <UserPlus2 size={15} className="text-signal-info" /> Step 2 — Add collaborators
          </div>
          <p className="text-sm text-base-300">Every teammate needs write access before they can push — do this in the first ten minutes.</p>
        </div>
        <div className="rounded-xl border border-base-700 bg-base-900 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-base-200 mb-2">
            <ShieldCheck size={15} className="text-signal-info" /> Step 3 — Protect main
          </div>
          <p className="text-sm text-base-300"><code className="font-mono text-signal-done">main</code> should always represent the stable, demo-ready version of your app.</p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Step 4 — Branch structure</h2>
        <div className="rounded-xl border border-base-700 bg-base-900 p-5 font-mono text-sm text-base-300 leading-loose">
          <div className="text-signal-done">main</div>
          <div className="pl-4 text-signal-info">├── feature/login</div>
          <div className="pl-4 text-signal-info">├── feature/dashboard</div>
          <div className="pl-4 text-signal-info">├── feature/api</div>
          <div className="pl-4 text-signal-info">└── feature/database</div>
        </div>
        <p className="mt-3 text-sm text-base-400">
          One feature = one branch. Branches isolate development work so nobody's half-finished code breaks anyone else's.
        </p>
      </div>

      <CommandBlock
        label="Rename the default branch to main (if needed)"
        code={"git branch -M main\ngit push -u origin main"}
        why="Some tools still default to 'master' — align on 'main' as a team early."
      />
    </PhaseFrame>
  );
}

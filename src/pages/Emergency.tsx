import { useState } from "react";
import { AlertTriangle, Siren } from "lucide-react";
import { EMERGENCIES } from "../data/emergency";
import { CommandBlock } from "../components/CommandBlock";
import { Pill } from "../components/Pill";

export function Emergency() {
  const [merge, setMerge] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-signal-danger text-xs font-mono tracking-wide mb-2">
          <Siren size={13} /> EMERGENCY
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          Git Emergency Room
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          Find what happened, do exactly what's listed, and don't run anything marked dangerous unless the situation
          specifically calls for it.
        </p>
      </div>

      <button
        onClick={() => setMerge((v) => !v)}
        className="w-full rounded-xl border-2 border-signal-danger bg-signal-danger/10 px-6 py-5 text-left hover:bg-signal-danger/15 transition-colors"
      >
        <div className="flex items-center gap-2 text-signal-danger font-display text-lg font-semibold">
          <AlertTriangle size={20} /> MERGE CONFLICT
        </div>
        <div className="text-sm text-base-300 mt-1">Tap for the step-by-step walkthrough.</div>
      </button>

      {merge && (
        <div className="rounded-xl border border-signal-danger/30 bg-base-900 p-5 space-y-4">
          <div className="text-signal-danger font-medium">DON'T PANIC.</div>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-base-300">
            <li>Stop editing randomly.</li>
            <li>
              Run <code className="font-mono text-signal-done">git status</code> to see which files are conflicted.
            </li>
          </ol>
          <p className="text-sm text-base-400">Git marks the conflicting sections directly in the file:</p>
          <pre className="rounded-lg border border-base-700 bg-base-950 p-3.5 font-mono text-[13px] text-base-300 overflow-x-auto">
{`<<<<<<< HEAD
your code
=======
their code
>>>>>>> branch`}
          </pre>
          <ol start={3} className="list-decimal list-inside space-y-1.5 text-sm text-base-300">
            <li>Choose the correct code.</li>
            <li>Remove the conflict markers.</li>
            <li>Save the file.</li>
          </ol>
          <CommandBlock code={"git add .\ngit commit"} why="Marks the conflict as resolved and completes the merge." />
          <div>
            <div className="text-xs text-base-400 mb-1.5">If it's gotten too tangled, back out entirely:</div>
            <CommandBlock code="git merge --abort" why="Cancels the merge and returns you to the state before you started — a safe reset." />
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Git Emergency Room</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {EMERGENCIES.map((e) => (
            <EmergencyCard key={e.id} case={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmergencyCard({ case: c }: { case: (typeof EMERGENCIES)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-base-700 bg-base-900 overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
        <span className="text-sm font-medium text-base-100">❌ {c.title}</span>
        {c.danger && <Pill variant="danger">danger</Pill>}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-base-800 pt-3">
          <div>
            <div className="text-xs text-base-500 mb-1">What happened?</div>
            <p className="text-sm text-base-300">{c.whatHappened}</p>
          </div>
          <div>
            <div className="text-xs text-base-500 mb-1">Do this</div>
            <ul className="space-y-1 text-sm text-base-300">
              {c.doThis.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-signal-done">–</span> {d}
                </li>
              ))}
            </ul>
          </div>
          {c.command && <CommandBlock code={c.command} />}
          {c.dontDo && (
            <div className="rounded-lg border border-signal-danger/25 bg-signal-danger/[0.05] px-3 py-2 text-sm text-base-300">
              <span className="text-signal-danger font-medium">Don't: </span>
              {c.dontDo}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

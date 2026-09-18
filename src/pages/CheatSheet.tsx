import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { GIT_COMMANDS } from "../data/commands";
import type { Risk } from "../data/commands";
import { Pill } from "../components/Pill";
import { CommandBlock } from "../components/CommandBlock";

const RISK_VARIANT: Record<Risk, "done" | "warn" | "danger"> = {
  safe: "done",
  caution: "warn",
  danger: "danger",
};

export function CheatSheet() {
  const [q, setQ] = useState("");
  const filtered = GIT_COMMANDS.filter((c) => c.cmd.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-base-400 text-xs font-mono tracking-wide mb-2">
          <BookOpen size={13} /> REFERENCE
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">Git cheat sheet</h1>
        <p className="mt-2 text-base-300 text-[15px]">Every command your team is likely to need, what it does, and its risk level.</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search commands..."
          className="w-full rounded-md border border-base-700 bg-base-900 pl-9 pr-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <div key={c.cmd} className="rounded-xl border border-base-700 bg-base-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <code className="font-mono text-base text-signal-done">{c.cmd}</code>
              <Pill variant={RISK_VARIANT[c.risk]}>{c.risk}</Pill>
            </div>
            <p className="text-sm text-base-300 mb-1">{c.what}</p>
            <p className="text-sm text-base-400 mb-3">
              <span className="text-base-500">When to use: </span>
              {c.when}
            </p>
            <CommandBlock code={c.example} />
          </div>
        ))}
        {filtered.length === 0 && <p className="text-base-500 text-sm">No commands match "{q}".</p>}
      </div>
    </div>
  );
}

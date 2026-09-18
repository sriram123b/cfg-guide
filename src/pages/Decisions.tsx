import { useState } from "react";
import { ScrollText, Plus, Trash2 } from "lucide-react";
import { useStore } from "../store";

function formatTime(ts: number) {
  return new Date(ts).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function Decisions() {
  const decisions = useStore((s) => s.decisions);
  const addDecision = useStore((s) => s.addDecision);
  const removeDecision = useStore((s) => s.removeDecision);
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addDecision(text.trim());
    setText("");
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-signal-phase text-xs font-mono tracking-wide mb-2">
          <ScrollText size={13} /> DECISION LOG
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          Record the calls you make
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          Scope cuts, stack changes, "we're doing X instead of Y" — write it down the moment you decide it. It's the
          fastest way to stop the same argument happening twice at hour 20.
        </p>
      </div>

      <form onSubmit={submit} className="flex gap-2.5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='e.g. "Cutting email confirmation — not worth the time this weekend"'
          className="flex-1 rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-md bg-signal-phase/15 border border-signal-phase/30 px-3.5 py-2 text-sm font-medium text-signal-phase hover:bg-signal-phase/25 transition-colors shrink-0"
        >
          <Plus size={14} /> Log it
        </button>
      </form>

      <div className="space-y-2">
        {decisions.map((d) => (
          <div key={d.id} className="rounded-lg border border-base-700 bg-base-900 px-4 py-3 flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-base-500">{formatTime(d.time)}</div>
              <div className="text-sm text-base-200 mt-0.5">{d.text}</div>
            </div>
            <button onClick={() => removeDecision(d.id)} className="text-base-500 hover:text-signal-danger shrink-0">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
        {decisions.length === 0 && <p className="text-sm text-base-500">No decisions logged yet.</p>}
      </div>
    </div>
  );
}

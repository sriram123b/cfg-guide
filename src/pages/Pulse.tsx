import { useState } from "react";
import { Radio, Send, Trash2, OctagonAlert, CheckCircle2 } from "lucide-react";
import { useStore } from "../store";

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export function Pulse() {
  const team = useStore((s) => s.team);
  const standups = useStore((s) => s.standups);
  const addStandup = useStore((s) => s.addStandup);
  const removeStandup = useStore((s) => s.removeStandup);
  const tasks = useStore((s) => s.tasks);
  const toggleTaskBlocked = useStore((s) => s.toggleTaskBlocked);

  const [author, setAuthor] = useState("");
  const [note, setNote] = useState("");

  const blockedTasks = tasks.filter((t) => t.blocked);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    addStandup(author || "Team", note.trim());
    setNote("");
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-signal-info text-xs font-mono tracking-wide mb-2">
          <Radio size={13} /> TEAM PULSE
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          Quick check-ins and blockers
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          A 30-second standup every couple of hours catches a stuck teammate before it costs you the whole build
          window. Post what you're on, and flag it if you're stuck.
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3 flex items-center gap-2">
          <OctagonAlert size={14} className="text-signal-danger" /> Blocked right now
        </h2>
        {blockedTasks.length === 0 ? (
          <p className="text-sm text-base-500">Nothing flagged as blocked. Good.</p>
        ) : (
          <div className="space-y-2">
            {blockedTasks.map((t) => (
              <div key={t.id} className="rounded-lg border border-signal-danger/30 bg-signal-danger/[0.05] px-4 py-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-base-100 font-medium">{t.title}</div>
                  <div className="text-xs text-base-400 mt-0.5">{t.assignee}{t.blockerNote ? ` — ${t.blockerNote}` : ""}</div>
                </div>
                <button
                  onClick={() => toggleTaskBlocked(t.id)}
                  className="shrink-0 flex items-center gap-1 text-xs text-signal-done hover:opacity-80"
                >
                  <CheckCircle2 size={13} /> Unblock
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-base-500 mt-2">Flag or unflag a task as blocked from the Tasks board.</p>
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Post a check-in</h2>
        <form onSubmit={submit} className="space-y-2.5">
          <div className="flex gap-2.5">
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-40 rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 outline-none"
            >
              <option value="">Who's posting</option>
              {team.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What are you on, and are you blocked on anything?"
              className="flex-1 rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-md bg-signal-info/15 border border-signal-info/30 px-3.5 py-2 text-sm font-medium text-signal-info hover:bg-signal-info/25 transition-colors shrink-0"
            >
              <Send size={14} /> Post
            </button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Recent check-ins</h2>
        <div className="space-y-2">
          {standups.map((n) => (
            <div key={n.id} className="rounded-lg border border-base-700 bg-base-900 px-4 py-3 flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-base-100">
                  <span className="font-medium">{n.author}</span> <span className="text-base-500 text-xs">{timeAgo(n.time)}</span>
                </div>
                <div className="text-sm text-base-300 mt-0.5">{n.note}</div>
              </div>
              <button onClick={() => removeStandup(n.id)} className="text-base-500 hover:text-signal-danger shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          {standups.length === 0 && <p className="text-sm text-base-500">No check-ins yet.</p>}
        </div>
      </div>
    </div>
  );
}

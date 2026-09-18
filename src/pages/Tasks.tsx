import { useState } from "react";
import { Plus, Trash2, OctagonAlert } from "lucide-react";
import { useStore } from "../store";
import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import type { Status, Task } from "../types";

const COLUMNS: { id: Status; label: string; color: string }[] = [
  { id: "todo", label: "To Do", color: "border-base-600" },
  { id: "in-progress", label: "In Progress", color: "border-signal-info/40" },
  { id: "done", label: "Done", color: "border-signal-done/40" },
];

export function Tasks() {
  const phase = getPhase("05")!;
  const tasks = useStore((s) => s.tasks);
  const addTask = useStore((s) => s.addTask);
  const updateTask = useStore((s) => s.updateTask);
  const removeTask = useStore((s) => s.removeTask);
  const toggleTaskBlocked = useStore((s) => s.toggleTaskBlocked);
  const team = useStore((s) => s.team);

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [branch, setBranch] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), assignee: assignee || "Unassigned", branch: branch || "-", status: "todo", pr: "" });
    setTitle("");
    setBranch("");
  };

  return (
    <PhaseFrame phase={phase}>
      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Team board</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.id} className={`rounded-xl border ${col.color} bg-base-900 p-3 min-h-[200px]`}>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-sm font-medium text-base-200">{col.label}</span>
                <span className="text-xs text-base-500 font-mono">
                  {tasks.filter((t) => t.status === col.id).length}
                </span>
              </div>
              <div className="space-y-2">
                {tasks
                  .filter((t) => t.status === col.id)
                  .map((t: Task) => (
                    <div
                      key={t.id}
                      className={`rounded-lg border p-2.5 ${
                        t.blocked ? "border-signal-danger/40 bg-signal-danger/[0.06]" : "border-base-700 bg-base-850"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm text-base-100">{t.title}</div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              if (!t.blocked) {
                                const note = window.prompt("What's blocking this? (optional)") || "";
                                toggleTaskBlocked(t.id, note);
                              } else {
                                toggleTaskBlocked(t.id);
                              }
                            }}
                            className={`transition-colors ${t.blocked ? "text-signal-danger" : "text-base-500 hover:text-signal-danger"}`}
                            aria-label="Toggle blocked"
                          >
                            <OctagonAlert size={13} />
                          </button>
                          <button onClick={() => removeTask(t.id)} className="text-base-500 hover:text-signal-danger">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      {t.blocked && t.blockerNote && (
                        <div className="mt-1 text-[11px] text-signal-danger">Blocked: {t.blockerNote}</div>
                      )}
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-base-400">
                        <span>{t.assignee}</span>
                        {t.branch !== "-" && <span className="font-mono text-signal-info">{t.branch}</span>}
                      </div>
                      <div className="mt-2 flex gap-1">
                        {COLUMNS.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => updateTask(t.id, { status: c.id })}
                            className={`flex-1 rounded px-1.5 py-1 text-[10px] font-medium transition-colors ${
                              t.status === c.id
                                ? "bg-base-700 text-base-100"
                                : "bg-base-900 text-base-500 hover:text-base-300"
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_160px_160px_auto]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task"
            className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
          />
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 outline-none"
          >
            <option value="">Assignee</option>
            {team.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
          <input
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="feature/branch"
            className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm font-mono text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 rounded-md bg-signal-info/15 border border-signal-info/30 px-4 py-2 text-sm font-medium text-signal-info hover:bg-signal-info/25 transition-colors"
          >
            <Plus size={14} /> Add
          </button>
        </form>
      </div>
    </PhaseFrame>
  );
}

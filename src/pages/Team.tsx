import { useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { useStore } from "../store";
import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";

export function Team() {
  const phase = getPhase("01")!;
  const team = useStore((s) => s.team);
  const addMember = useStore((s) => s.addMember);
  const removeMember = useStore((s) => s.removeMember);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [github, setGithub] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMember({ name: name.trim(), role: role.trim() || "Unassigned", github: github.trim() });
    setName("");
    setRole("");
    setGithub("");
  };

  return (
    <PhaseFrame phase={phase}>
      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Team roster</h2>
        <div className="rounded-xl border border-base-700 bg-base-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-base-700 text-left text-base-400 text-xs uppercase tracking-wide">
                <th className="px-4 py-2.5 font-medium">Name</th>
                <th className="px-4 py-2.5 font-medium">Role</th>
                <th className="px-4 py-2.5 font-medium">GitHub</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {team.map((m) => (
                <tr key={m.id} className="border-b border-base-800 last:border-0">
                  <td className="px-4 py-2.5 text-base-100">{m.name}</td>
                  <td className="px-4 py-2.5 text-base-300">{m.role}</td>
                  <td className="px-4 py-2.5 font-mono text-signal-info text-[13px]">
                    {m.github ? `@${m.github}` : "—"}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      onClick={() => removeMember(m.id)}
                      className="text-base-500 hover:text-signal-danger transition-colors"
                      aria-label={`Remove ${m.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {team.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-base-500">
                    No team members yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <form onSubmit={submit} className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member name"
            className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role (e.g. Backend)"
            className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
          />
          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="GitHub username"
            className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 rounded-md bg-signal-info/15 border border-signal-info/30 px-4 py-2 text-sm font-medium text-signal-info hover:bg-signal-info/25 transition-colors"
          >
            <UserPlus size={14} /> Add
          </button>
        </form>
      </div>
    </PhaseFrame>
  );
}

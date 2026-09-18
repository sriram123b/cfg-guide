import { useState } from "react";
import { Plus, Trash2, Plug } from "lucide-react";
import { useStore } from "../store";
import type { Status } from "../types";

export function ApiContract() {
  const endpoints = useStore((s) => s.apiEndpoints);
  const addApiEndpoint = useStore((s) => s.addApiEndpoint);
  const updateApiEndpoint = useStore((s) => s.updateApiEndpoint);
  const removeApiEndpoint = useStore((s) => s.removeApiEndpoint);
  const team = useStore((s) => s.team);

  const [form, setForm] = useState({ endpoint: "", method: "GET", request: "", response: "", error: "", owner: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.endpoint.trim()) return;
    addApiEndpoint({ ...form, status: "todo" });
    setForm({ endpoint: "", method: "GET", request: "", response: "", error: "", owner: "" });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-signal-info text-xs font-mono tracking-wide mb-2">
          <Plug size={13} /> API CONTRACT
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          Agree the contract before you build against it
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          Frontend and backend developers should agree on request and response shapes before implementing features
          that depend on them — it's cheaper to change a field name here than after both sides are built.
        </p>
      </div>

      <div className="rounded-xl border border-base-700 bg-base-900 overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="border-b border-base-700 text-left text-base-400 text-xs uppercase tracking-wide">
              <th className="px-3 py-2.5 font-medium">Endpoint</th>
              <th className="px-3 py-2.5 font-medium">Method</th>
              <th className="px-3 py-2.5 font-medium">Request</th>
              <th className="px-3 py-2.5 font-medium">Response</th>
              <th className="px-3 py-2.5 font-medium">Error</th>
              <th className="px-3 py-2.5 font-medium">Owner</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((e) => (
              <tr key={e.id} className="border-b border-base-800 last:border-0 align-top">
                <td className="px-3 py-2.5 font-mono text-signal-done text-[13px]">{e.endpoint}</td>
                <td className="px-3 py-2.5 font-mono text-base-300 text-[13px]">{e.method}</td>
                <td className="px-3 py-2.5 font-mono text-base-400 text-[12px] max-w-[160px] truncate">{e.request}</td>
                <td className="px-3 py-2.5 font-mono text-base-400 text-[12px] max-w-[200px] truncate">{e.response}</td>
                <td className="px-3 py-2.5 text-base-400 text-[12px] max-w-[160px] truncate">{e.error}</td>
                <td className="px-3 py-2.5 text-base-300">{e.owner}</td>
                <td className="px-3 py-2.5">
                  <select
                    value={e.status}
                    onChange={(ev) => updateApiEndpoint(e.id, { status: ev.target.value as Status })}
                    className="bg-transparent outline-none text-xs"
                  >
                    <option value="todo">To do</option>
                    <option value="in-progress">In progress</option>
                    <option value="done">Done</option>
                  </select>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button onClick={() => removeApiEndpoint(e.id)} className="text-base-500 hover:text-signal-danger">
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={submit} className="grid gap-2.5 sm:grid-cols-3">
        <input
          value={form.endpoint}
          onChange={(e) => setForm((f) => ({ ...f, endpoint: e.target.value }))}
          placeholder="/api/endpoint"
          className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm font-mono text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
        />
        <select
          value={form.method}
          onChange={(e) => setForm((f) => ({ ...f, method: e.target.value }))}
          className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 outline-none"
        >
          {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select
          value={form.owner}
          onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))}
          className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 outline-none"
        >
          <option value="">Owner</option>
          {team.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
        <input
          value={form.request}
          onChange={(e) => setForm((f) => ({ ...f, request: e.target.value }))}
          placeholder="Request shape"
          className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm font-mono text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
        />
        <input
          value={form.response}
          onChange={(e) => setForm((f) => ({ ...f, response: e.target.value }))}
          placeholder="Response shape"
          className="rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm font-mono text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
        />
        <div className="flex gap-2">
          <input
            value={form.error}
            onChange={(e) => setForm((f) => ({ ...f, error: e.target.value }))}
            placeholder="Error cases"
            className="flex-1 rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 rounded-md bg-signal-info/15 border border-signal-info/30 px-3.5 py-2 text-sm font-medium text-signal-info hover:bg-signal-info/25 transition-colors shrink-0"
          >
            <Plus size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}

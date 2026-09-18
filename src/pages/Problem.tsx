import { useState } from "react";
import { Plus, X, AlertTriangle } from "lucide-react";
import { useStore } from "../store";
import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import type { MvpTier } from "../types";

const FIELDS: { key: keyof Omit<ReturnType<typeof useStore.getState>["problem"], "features">; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "targetUsers", label: "Target users" },
  { key: "painPoints", label: "Pain points" },
  { key: "existingSolution", label: "Existing solution" },
  { key: "proposedSolution", label: "Proposed solution" },
  { key: "constraints", label: "Constraints" },
  { key: "successCriteria", label: "Success criteria" },
];

const TIERS: { id: MvpTier; label: string; hint: string; color: string }[] = [
  { id: "must", label: "Must Have", hint: "The app doesn't work without this.", color: "border-signal-danger/30 bg-signal-danger/[0.04]" },
  { id: "should", label: "Should Have", hint: "Important, but the demo survives without it.", color: "border-signal-warn/30 bg-signal-warn/[0.04]" },
  { id: "could", label: "Could Have", hint: "Nice polish if time allows.", color: "border-signal-info/30 bg-signal-info/[0.04]" },
  { id: "later", label: "Do Later", hint: "Explicitly out of scope for this hackathon.", color: "border-base-600 bg-base-850" },
];

export function Problem() {
  const phase = getPhase("02")!;
  const problem = useStore((s) => s.problem);
  const updateProblem = useStore((s) => s.updateProblem);
  const addFeature = useStore((s) => s.addFeature);
  const setFeatureTier = useStore((s) => s.setFeatureTier);
  const removeFeature = useStore((s) => s.removeFeature);
  const [newFeature, setNewFeature] = useState("");

  const mustCount = problem.features.filter((f) => f.tier === "must").length;

  return (
    <PhaseFrame phase={phase}>
      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Problem breakdown</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <div key={f.key} className={f.key === "problem" || f.key === "proposedSolution" ? "sm:col-span-2" : ""}>
              <label className="text-xs text-base-400 mb-1 block">{f.label}</label>
              <textarea
                value={problem[f.key]}
                onChange={(e) => updateProblem({ [f.key]: e.target.value })}
                rows={f.key === "problem" || f.key === "proposedSolution" ? 2 : 2}
                className="w-full rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 focus:border-signal-info outline-none resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-base-200">MVP filter</h2>
          {mustCount > 5 && (
            <span className="flex items-center gap-1.5 text-xs text-signal-warn">
              <AlertTriangle size={13} />
              Hackathon danger: too many "Must Haves" before one flow works end to end.
            </span>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newFeature.trim()) return;
            addFeature(newFeature.trim(), "must");
            setNewFeature("");
          }}
          className="flex gap-2 mb-4"
        >
          <input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature to sort"
            className="flex-1 rounded-md border border-base-700 bg-base-900 px-3 py-2 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-md bg-base-800 border border-base-600 px-3.5 py-2 text-sm font-medium text-base-200 hover:border-base-500 transition-colors"
          >
            <Plus size={14} /> Add
          </button>
        </form>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <div key={tier.id} className={`rounded-xl border p-3 ${tier.color} min-h-[140px]`}>
              <div className="text-sm font-medium text-base-100">{tier.label}</div>
              <div className="text-[11px] text-base-400 mb-3">{tier.hint}</div>
              <div className="space-y-1.5">
                {problem.features
                  .filter((f) => f.tier === tier.id)
                  .map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between gap-1.5 rounded-md bg-base-900/70 border border-base-700 px-2 py-1.5 text-xs text-base-200"
                    >
                      <span>{f.name}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <select
                          value={f.tier}
                          onChange={(e) => setFeatureTier(f.id, e.target.value as MvpTier)}
                          className="bg-base-800 border border-base-700 rounded text-[10px] text-base-300 px-1 py-0.5 outline-none"
                        >
                          {TIERS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        <button onClick={() => removeFeature(f.id)} className="text-base-500 hover:text-signal-danger">
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhaseFrame>
  );
}

import { useStore } from "../store";
import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import { ArrowDown } from "lucide-react";

const OPTIONS = {
  frontend: ["React", "Next.js", "HTML/CSS/JS", "Other"],
  backend: ["Node.js + Express", "Python + Flask", "Java + Spring Boot", "Other"],
  database: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Other"],
};

export function Architecture() {
  const phase = getPhase("03")!;
  const architecture = useStore((s) => s.architecture);
  const setArchitecture = useStore((s) => s.setArchitecture);

  return (
    <PhaseFrame phase={phase}>
      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Architecture builder</h2>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          {(Object.keys(OPTIONS) as (keyof typeof OPTIONS)[]).map((layer) => (
            <div key={layer} className="rounded-xl border border-base-700 bg-base-900 p-3.5">
              <div className="text-xs uppercase tracking-wide text-base-400 mb-2">{layer}</div>
              <div className="space-y-1.5">
                {OPTIONS[layer].map((opt) => (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm cursor-pointer transition-colors ${
                      architecture[layer] === opt
                        ? "border-signal-phase bg-signal-phase/10 text-base-100"
                        : "border-base-700 text-base-300 hover:border-base-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name={layer}
                      className="accent-signal-phase"
                      checked={architecture[layer] === opt}
                      onChange={() => setArchitecture({ [layer]: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-base-700 bg-base-900 p-6">
          <div className="text-xs uppercase tracking-wide text-base-400 mb-4 text-center">Your stack</div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="rounded-lg border border-signal-info/30 bg-signal-info/10 px-5 py-2.5 text-sm font-medium text-signal-info font-mono">
              {architecture.frontend || "Frontend"}
            </div>
            <ArrowDown size={16} className="text-base-500" />
            <div className="rounded-lg border border-base-600 bg-base-800 px-5 py-2.5 text-sm font-medium text-base-300 font-mono">
              API
            </div>
            <ArrowDown size={16} className="text-base-500" />
            <div className="rounded-lg border border-signal-phase/30 bg-signal-phase/10 px-5 py-2.5 text-sm font-medium text-signal-phase font-mono">
              {architecture.backend || "Backend"}
            </div>
            <ArrowDown size={16} className="text-base-500" />
            <div className="rounded-lg border border-signal-done/30 bg-signal-done/10 px-5 py-2.5 text-sm font-medium text-signal-done font-mono">
              {architecture.database || "Database"}
            </div>
          </div>
        </div>
      </div>
    </PhaseFrame>
  );
}

import { getPhase } from "../data/phases";
import { PhaseFrame } from "../components/PhaseFrame";
import { Checklist } from "../components/Checklist";
import { ArrowDown } from "lucide-react";

const JOURNEY = ["User opens app", "Login", "Dashboard", "Submit request", "Backend", "Database", "Response", "UI update"];

const INTEGRATION_CHECKLIST = [
  "Backend running",
  "Frontend running",
  "Correct ports",
  "Correct API URL",
  "CORS configured",
  "Environment variables loaded",
  "API tested independently",
  "Frontend receives response",
  "Loading state handled",
  "Error state handled",
];

export function Integration() {
  const phase = getPhase("06")!;

  return (
    <PhaseFrame phase={phase}>
      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">One complete user journey</h2>
        <div className="rounded-xl border border-signal-warn/30 bg-signal-warn/[0.05] p-5 mb-4 text-sm text-base-300">
          🔥 Stop building isolated features. Before anything else, get one full flow working end to end.
        </div>
        <div className="rounded-xl border border-base-700 bg-base-900 p-6">
          <div className="flex flex-col items-center gap-1">
            {JOURNEY.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="rounded-lg border border-signal-phase/30 bg-signal-phase/[0.06] px-4 py-2 text-sm font-mono text-base-200">
                  {step}
                </div>
                {i < JOURNEY.length - 1 && <ArrowDown size={14} className="text-base-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Integration checklist</h2>
        <Checklist phaseId="integration-detail" items={INTEGRATION_CHECKLIST} />
      </div>

      <div className="rounded-xl border border-base-700 bg-base-900 p-5">
        <h2 className="text-sm font-medium text-base-200 mb-2">Troubleshooting: "Failed to fetch"</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm text-base-300">
          <li>Is the backend running?</li>
          <li>Correct URL?</li>
          <li>Correct port?</li>
          <li>CORS configured?</li>
          <li>Network request actually firing?</li>
          <li>Environment variable loaded?</li>
        </ol>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-base-700 bg-base-900 p-5">
          <h2 className="text-sm font-medium text-base-200 mb-2">404</h2>
          <p className="text-sm text-base-300">Check the HTTP method, the endpoint spelling, the route registration, and the port.</p>
        </div>
        <div className="rounded-xl border border-base-700 bg-base-900 p-5">
          <h2 className="text-sm font-medium text-base-200 mb-2">500</h2>
          <p className="text-sm text-base-300">Check the backend terminal output, the controller logic, the database connection, and environment variables.</p>
        </div>
      </div>
    </PhaseFrame>
  );
}

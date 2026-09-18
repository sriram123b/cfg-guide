import { Checklist } from "../components/Checklist";
import { CommandBlock } from "../components/CommandBlock";
import { ArrowDown, Server as ServerIcon } from "lucide-react";

const FLOW = ["Frontend", "API request", "Express route", "Controller", "Database", "Response", "Frontend"];

const BACKEND_CHECKLIST = [
  "Node installed",
  "npm working",
  "Express (or your framework) installed",
  "Server running locally",
  ".env file set up",
  "CORS configured",
  "Routes defined",
  "Controllers separated from routes",
  "Database connection confirmed",
  "Error handling in place",
];

export function Server() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-signal-warn text-xs font-mono tracking-wide mb-2">
          <ServerIcon size={13} /> JS + SERVER
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          Server workflow
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          The request path your backend needs to support, and what to check before you assume the server is the problem.
        </p>
      </div>

      <div className="rounded-xl border border-base-700 bg-base-900 p-6">
        <div className="flex flex-col items-center gap-1">
          {FLOW.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="rounded-lg border border-base-600 bg-base-850 px-4 py-2 text-sm font-mono text-base-200">
                {step}
              </div>
              {i < FLOW.length - 1 && <ArrowDown size={14} className="text-base-500" />}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Backend checklist</h2>
        <Checklist phaseId="server" items={BACKEND_CHECKLIST} />
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">Health check</h2>
        <p className="text-sm text-base-400 mb-3">
          Build this first, on both frontend and backend. If it doesn't work, nothing downstream will either.
        </p>
        <CommandBlock
          label="GET /api/health"
          code={'{\n  "status": "ok"\n}'}
          why="A one-endpoint proof that your server is running and reachable before you build anything on top of it."
        />
      </div>
    </div>
  );
}

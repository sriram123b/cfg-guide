import { Clock } from "lucide-react";
import { useStore } from "../store";
import { useRemainingMs, formatDuration } from "../lib/clock";

export function ClockPill() {
  const clock = useStore((s) => s.clock);
  const remaining = useRemainingMs();

  if (!clock.startTime || remaining === null) return null;

  const urgent = remaining < 3 * 3600 * 1000;
  const critical = remaining < 1 * 3600 * 1000;

  return (
    <div
      className={`mx-4 mt-3 flex items-center justify-center gap-2 rounded-md border px-3 py-2 font-mono text-sm ${
        critical
          ? "border-signal-danger/40 bg-signal-danger/10 text-signal-danger"
          : urgent
          ? "border-signal-warn/40 bg-signal-warn/10 text-signal-warn"
          : "border-base-700 bg-base-850 text-base-200"
      }`}
    >
      <Clock size={13} /> {formatDuration(remaining)}
    </div>
  );
}

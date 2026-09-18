import { useState } from "react";
import { Clock, Play, Square } from "lucide-react";
import { useStore } from "../store";
import { useRemainingMs, formatDuration } from "../lib/clock";

export function ClockCard() {
  const clock = useStore((s) => s.clock);
  const startClock = useStore((s) => s.startClock);
  const stopClock = useStore((s) => s.stopClock);
  const remaining = useRemainingMs();
  const [hours, setHours] = useState(24);

  const urgent = remaining !== null && remaining < 3 * 3600 * 1000;
  const critical = remaining !== null && remaining < 1 * 3600 * 1000;

  if (!clock.startTime) {
    return (
      <div className="rounded-xl border border-base-700 bg-base-900 p-5">
        <div className="flex items-center gap-2 text-sm text-base-400 mb-3">
          <Clock size={15} /> Hackathon clock
        </div>
        <p className="text-sm text-base-300 mb-4">
          Set your total build time once, and the whole app tracks urgency against it — Final Hours flips automatically
          as you close in on feature freeze.
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={72}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-20 rounded-md border border-base-700 bg-base-950 px-2.5 py-1.5 text-sm text-base-100 outline-none focus:border-signal-info"
          />
          <span className="text-sm text-base-400">hours, starting now</span>
          <button
            onClick={() => startClock(hours)}
            className="ml-auto flex items-center gap-1.5 rounded-md bg-signal-done/15 border border-signal-done/30 px-3.5 py-1.5 text-sm font-medium text-signal-done hover:bg-signal-done/25 transition-colors"
          >
            <Play size={13} /> Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-5 ${
        critical
          ? "border-signal-danger/40 bg-signal-danger/[0.06]"
          : urgent
          ? "border-signal-warn/40 bg-signal-warn/[0.05]"
          : "border-base-700 bg-base-900"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className={`flex items-center gap-2 text-sm ${critical ? "text-signal-danger" : urgent ? "text-signal-warn" : "text-base-400"}`}>
          <Clock size={15} /> {critical ? "Feature freeze — time's almost up" : urgent ? "Final hours" : "Time remaining"}
        </div>
        <button onClick={stopClock} className="text-base-500 hover:text-signal-danger transition-colors" aria-label="Stop clock">
          <Square size={13} />
        </button>
      </div>
      <div
        className={`font-mono text-4xl font-semibold tracking-tight ${
          critical ? "text-signal-danger" : urgent ? "text-signal-warn" : "text-base-100"
        }`}
      >
        {remaining !== null ? formatDuration(remaining) : "--:--:--"}
      </div>
      <div className="text-xs text-base-500 mt-1">of {clock.durationHours}h total</div>
    </div>
  );
}

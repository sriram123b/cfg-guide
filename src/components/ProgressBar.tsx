export function ProgressBar({ value, color = "info" }: { value: number; color?: "info" | "done" | "phase" }) {
  const colorMap = {
    info: "bg-signal-info",
    done: "bg-signal-done",
    phase: "bg-signal-phase",
  };
  return (
    <div className="h-2 w-full rounded-full bg-base-800 overflow-hidden">
      <div
        className={`h-full rounded-full ${colorMap[color]} transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

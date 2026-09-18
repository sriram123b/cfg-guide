const variants: Record<string, string> = {
  done: "bg-signal-done/15 text-signal-done border-signal-done/30",
  info: "bg-signal-info/15 text-signal-info border-signal-info/30",
  warn: "bg-signal-warn/15 text-signal-warn border-signal-warn/30",
  danger: "bg-signal-danger/15 text-signal-danger border-signal-danger/30",
  phase: "bg-signal-phase/15 text-signal-phase border-signal-phase/30",
  neutral: "bg-base-700/50 text-base-300 border-base-600",
};

export function Pill({ children, variant = "neutral" }: { children: React.ReactNode; variant?: keyof typeof variants }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

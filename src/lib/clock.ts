import { useEffect, useState } from "react";
import { useStore } from "../store";

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function useRemainingMs(): number | null {
  const clock = useStore((s) => s.clock);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!clock.startTime) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [clock.startTime]);

  if (!clock.startTime) return null;
  const end = clock.startTime + clock.durationHours * 3600 * 1000;
  return end - now;
}

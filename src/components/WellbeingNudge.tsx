import { useMemo } from "react";
import { HeartPulse } from "lucide-react";

const TIPS = [
  "Drink some water. Dehydration feels exactly like a stuck bug.",
  "Eat something before you're starving — decision quality drops fast on an empty stomach.",
  "Stand up and stretch for two minutes. Your back will thank you at hour 18.",
  "If you've been stuck for 30+ minutes, say so out loud — someone on your team has probably hit this before.",
  "Sleep is a feature, not a luxury. A tired team ships more bugs than a rested one ships features.",
  "Step outside for five minutes if you can. Fresh air resets focus better than another coffee.",
  "Check in with a teammate who's gone quiet — silence is usually a blocker, not focus.",
];

export function WellbeingNudge() {
  const tip = useMemo(() => TIPS[Math.floor(Date.now() / (1000 * 60 * 30)) % TIPS.length], []);

  return (
    <div className="rounded-xl border border-base-700 bg-base-900 p-5 flex flex-col">
      <div className="flex items-center gap-2 text-sm text-base-400 mb-2">
        <HeartPulse size={15} className="text-signal-done" /> Team wellbeing
      </div>
      <p className="text-sm text-base-300">{tip}</p>
    </div>
  );
}

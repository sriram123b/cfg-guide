import { ClipboardList } from "lucide-react";
import { Checklist } from "../components/Checklist";

const GROUPS = [
  {
    id: "prep-accounts",
    title: "Accounts & access",
    items: ["GitHub account created and 2FA enabled", "Added to the team's GitHub org/repo in advance", "Discord/Slack workspace joined", "Any required event accounts (Devpost, sign-in portal) set up"],
  },
  {
    id: "prep-tools",
    title: "Tools installed",
    items: ["Node.js + npm installed and working (node -v)", "Git installed and configured (git config --global)", "Code editor set up (extensions, formatter)", "Postman/Insomnia or curl for testing APIs"],
  },
  {
    id: "prep-laptop",
    title: "Laptop readiness",
    items: ["Charger packed", "Laptop fully updated (OS updates done before, not during)", "Battery health checked, backup power bank if possible", "Offline text editor / notes app for when Wi-Fi is spotty"],
  },
  {
    id: "prep-logistics",
    title: "Team logistics",
    items: ["Team communication channel created (Discord/Slack/WhatsApp)", "Standup cadence agreed (e.g. every 3 hours)", "Everyone's contact info exchanged", "Meeting point / seating arranged if in person"],
  },
];

export function Prep() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-signal-info text-xs font-mono tracking-wide mb-2">
          <ClipboardList size={13} /> BEFORE THE HACKATHON STARTS
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          Prep checklist
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          Everything here should be done the night before, not during your first hour of build time. Every minute
          spent installing Node during the hackathon is a minute not spent building.
        </p>
      </div>

      {GROUPS.map((g) => (
        <div key={g.id}>
          <h2 className="text-sm font-medium text-base-200 mb-3">{g.title}</h2>
          <Checklist phaseId={g.id} items={g.items} />
        </div>
      ))}
    </div>
  );
}

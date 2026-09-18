import { ClipboardCheck } from "lucide-react";
import { CommandBlock } from "../components/CommandBlock";

interface Row {
  page: string;
  checks: string[];
}

const ROWS: Row[] = [
  { page: "Team", checks: ["Add a member", "Remove a member"] },
  { page: "Problem", checks: ["Edit a text field", "Add a feature", "Change its tier", "Delete a feature"] },
  { page: "Architecture", checks: ["Click through frontend/backend/database options", "Confirm the stack diagram updates live"] },
  { page: "GitHub Setup", checks: ["Click a command's copy button", "Confirm your clipboard has it"] },
  { page: "Tasks", checks: ["Add a task", "Move it between To Do / In Progress / Done", "Delete a task"] },
  { page: "API Contract", checks: ["Add a new endpoint row", "Change its status", "Delete a row"] },
  { page: "Pull Requests", checks: ["Copy the PR template", "Paste it somewhere to confirm"] },
  { page: "Integration / Testing", checks: ["Check off a few checklist items"] },
  { page: "Emergency", checks: ["Open the MERGE CONFLICT walkthrough", "Expand a couple of Emergency Room cards"] },
  { page: "Final Hours", checks: ["Check off items in each countdown block"] },
  { page: "Demo", checks: ["Confirm the flow diagram and failure plan render"] },
  { page: "Cheat Sheet", checks: ["Search for a command (e.g. \"reset\")", "Confirm results filter"] },
  { page: "What Do I Run?", checks: ["Search \"merge conflict\"", "Click the result", "Confirm the follow-up link to Emergency works"] },
  { page: "Resources", checks: ["Click one external link", "Confirm it opens the real GitHub docs"] },
];

export function DevTestingGuide() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-base-400 text-xs font-mono tracking-wide mb-2">
          <ClipboardCheck size={13} /> FOR WHOEVER SETS THIS UP
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          Testing this app before your team uses it
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          A quick pass to confirm the Command Center itself is working correctly — run this once after{" "}
          <code className="font-mono text-signal-done">npm install && npm run dev</code>, before the hackathon starts.
        </p>
      </div>

      <div className="rounded-xl border border-base-700 bg-base-900 p-5">
        <h2 className="text-sm font-medium text-base-200 mb-2">1. First load</h2>
        <ul className="space-y-1.5 text-sm text-base-300">
          <li className="flex gap-2"><span className="text-base-500">–</span> The Dashboard loads with the progress bar and the 10-phase timeline strip.</li>
          <li className="flex gap-2"><span className="text-base-500">–</span> "What are we doing right now?" expands and shows the current phase's task.</li>
        </ul>
      </div>

      <div className="rounded-xl border border-signal-warn/25 bg-signal-warn/[0.04] p-5">
        <h2 className="text-sm font-medium text-signal-warn mb-2">2. Persistence — the most important check</h2>
        <p className="text-sm text-base-300">
          Go to Team, add a member, then hard refresh the page. The member should still be there. If it disappears,
          localStorage isn't working in your browser — check you're not in a private/incognito window with storage
          blocked.
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">3. Walk every page</h2>
        <div className="rounded-xl border border-base-700 bg-base-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-base-700 text-left text-base-400 text-xs uppercase tracking-wide">
                <th className="px-4 py-2.5 font-medium w-40">Page</th>
                <th className="px-4 py-2.5 font-medium">What to test</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.page} className="border-b border-base-800 last:border-0 align-top">
                  <td className="px-4 py-2.5 text-base-100 font-medium">{r.page}</td>
                  <td className="px-4 py-2.5 text-base-300">{r.checks.join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-base-700 bg-base-900 p-5">
        <h2 className="text-sm font-medium text-base-200 mb-2">4. Checklist → progress bar link</h2>
        <p className="text-sm text-base-300">
          Check off every item on one phase's checklist. That phase's badge should hit 100%, and the sidebar's
          overall progress percentage should tick up.
        </p>
      </div>

      <div className="rounded-xl border border-base-700 bg-base-900 p-5">
        <h2 className="text-sm font-medium text-base-200 mb-2">5. Reset</h2>
        <p className="text-sm text-base-300">
          Click "Reset hackathon" at the bottom of the sidebar, confirm the dialog, and confirm everything reverts
          to the seed data (Alex/Sam/Rahul/Priya/Arjun, the Community Connect problem, and so on).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-base-700 bg-base-900 p-5">
          <h2 className="text-sm font-medium text-base-200 mb-2">6. Mobile / responsive</h2>
          <ul className="space-y-1.5 text-sm text-base-300">
            <li className="flex gap-2"><span className="text-base-500">–</span> Shrink the window or use dev tools device mode.</li>
            <li className="flex gap-2"><span className="text-base-500">–</span> The hamburger menu should open/close the sidebar as an overlay.</li>
            <li className="flex gap-2"><span className="text-base-500">–</span> Tables (Team, API Contract) should scroll horizontally, not break the layout.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-base-700 bg-base-900 p-5">
          <h2 className="text-sm font-medium text-base-200 mb-2">7. Offline check</h2>
          <p className="text-sm text-base-300">
            After the page has loaded once, turn off Wi-Fi and refresh. The app itself should still work — only
            Google Fonts and the external Resources links will fail, which is expected.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-base-200 mb-3">8. Production build sanity check</h2>
        <CommandBlock code={"npm run build\nnpm run preview"} why="Open the printed preview URL and spot-check a few pages — the closest simulation of what a judge or teammate would see." />
      </div>

      <div className="rounded-xl border border-signal-info/25 bg-signal-info/[0.04] p-5 text-sm text-base-300">
        If anything breaks at any step, open the browser console (F12 → Console tab) — that shows the actual error
        and is the fastest way to track down what's wrong.
      </div>
    </div>
  );
}

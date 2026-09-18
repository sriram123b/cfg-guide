import { useState } from "react";
import { GitPullRequest, Copy, Check } from "lucide-react";

const STEPS = [
  "Push branch",
  "Open PR",
  "Explain changes",
  "Request reviewer",
  "Reviewer checks code",
  "Test",
  "Fix feedback",
  "Merge",
  "Delete branch",
];

const TEMPLATE = `## What changed?

## Why?

## How was it tested?

## Screenshots

## Known issues`;

export function PullRequests() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(TEMPLATE);
    } catch {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-signal-info text-xs font-mono tracking-wide mb-2">
          <GitPullRequest size={13} /> PULL REQUEST WORKFLOW
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">
          Every merge goes through a PR
        </h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          GitHub documents pull requests as the mechanism for proposing, reviewing, and merging changes — treat that
          as the only path into main, even under time pressure.
        </p>
      </div>

      <div className="rounded-xl border border-base-700 bg-base-900 p-5 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[760px]">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className="flex-1 rounded-lg border border-base-600 bg-base-850 px-3 py-2.5 text-center text-xs font-medium text-base-200">
                {s}
              </div>
              {i < STEPS.length - 1 && <span className="text-base-600 shrink-0">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-base-200">PR template</h2>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 rounded-md border border-base-600 bg-base-800 px-2.5 py-1.5 text-xs font-medium text-base-200 hover:bg-base-700 transition-colors"
          >
            {copied ? (
              <>
                <Check size={13} className="text-signal-done" /> Copied
              </>
            ) : (
              <>
                <Copy size={13} /> Copy template
              </>
            )}
          </button>
        </div>
        <pre className="rounded-xl border border-base-700 bg-base-900 p-4 text-sm font-mono text-base-300 whitespace-pre-wrap">
          {TEMPLATE}
        </pre>
      </div>

      <div className="rounded-xl border border-base-700 bg-base-900 p-5">
        <h2 className="text-sm font-medium text-base-200 mb-2">Team rule</h2>
        <p className="text-sm text-base-300">
          At least one teammate reviews every important change before it merges — even a quick glance catches bugs a
          rushed author misses.
        </p>
      </div>
    </div>
  );
}

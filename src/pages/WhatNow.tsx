import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { WHAT_TO_RUN } from "../data/whatToRun";
import { CommandBlock } from "../components/CommandBlock";

export function WhatNow() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const matches = q
    ? WHAT_TO_RUN.filter(
        (s) =>
          s.question.toLowerCase().includes(q.toLowerCase()) ||
          s.keywords.some((k) => k.toLowerCase().includes(q.toLowerCase()))
      )
    : WHAT_TO_RUN;

  const active = WHAT_TO_RUN.find((s) => s.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">What do I run?</h1>
        <p className="mt-2 text-base-300 text-[15px]">Describe what happened. Get the exact workflow — nothing else.</p>
      </div>

      <div className="relative max-w-lg">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-500" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSelected(null);
          }}
          placeholder='e.g. "I have a merge conflict"'
          className="w-full rounded-md border border-base-700 bg-base-900 pl-9 pr-3 py-2.5 text-sm text-base-100 placeholder:text-base-500 focus:border-signal-info outline-none"
        />
      </div>

      {!active && (
        <div className="grid gap-2 sm:grid-cols-2">
          {matches.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className="flex items-center justify-between gap-2 rounded-lg border border-base-700 bg-base-900 px-4 py-3 text-left text-sm text-base-200 hover:border-signal-info transition-colors"
            >
              "{s.question}"
              <ArrowRight size={14} className="shrink-0 text-base-500" />
            </button>
          ))}
          {matches.length === 0 && <p className="text-base-500 text-sm">Nothing matches — try the Emergency page or the Cheat Sheet.</p>}
        </div>
      )}

      {active && (
        <div className="rounded-xl border border-signal-info/30 bg-signal-info/[0.04] p-5 space-y-4">
          <button onClick={() => setSelected(null)} className="text-xs text-base-400 hover:text-base-200">
            ← Back to search
          </button>
          <div className="text-base-100 font-medium">"{active.question}"</div>
          {active.code && <CommandBlock code={active.code} />}
          <p className="text-sm text-base-300">{active.answer}</p>
          {active.followUp && (
            <Link
              to={active.followUp}
              className="inline-flex items-center gap-1.5 text-sm text-signal-info hover:gap-2 transition-all"
            >
              See full walkthrough <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

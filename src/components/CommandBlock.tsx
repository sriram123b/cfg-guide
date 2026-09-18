import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CommandBlock({
  code,
  label,
  why,
}: {
  code: string;
  label?: string;
  why?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard may be unavailable; fail silently
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="rounded-lg border border-base-700 bg-base-900 overflow-hidden">
      {label && (
        <div className="px-3.5 py-2 border-b border-base-700 text-sm font-medium text-base-200">
          {label}
        </div>
      )}
      <div className="flex items-start justify-between gap-3 px-3.5 py-3">
        <pre className="font-mono text-[13px] leading-relaxed text-signal-done whitespace-pre-wrap break-all">
          {code}
        </pre>
        <button
          onClick={copy}
          className="shrink-0 flex items-center gap-1.5 rounded-md border border-base-600 bg-base-800 px-2.5 py-1.5 text-xs font-medium text-base-200 hover:bg-base-700 hover:border-base-500 transition-colors"
        >
          {copied ? (
            <>
              <Check size={13} className="text-signal-done" /> Copied
            </>
          ) : (
            <>
              <Copy size={13} /> Copy
            </>
          )}
        </button>
      </div>
      {why && (
        <div className="px-3.5 py-2.5 border-t border-base-700 bg-base-850 text-[13px] text-base-300">
          <span className="text-base-400 font-medium">Why? </span>
          {why}
        </div>
      )}
    </div>
  );
}

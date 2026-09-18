import { useStore } from "../store";

export function Checklist({ phaseId, items }: { phaseId: string; items: string[] }) {
  const isChecked = useStore((s) => s.isChecked);
  const toggle = useStore((s) => s.toggleChecklistItem);

  return (
    <ul className="space-y-2">
      {items.map((item, i) => {
        const id = `item-${i}`;
        const checked = isChecked(phaseId, id);
        return (
          <li key={id}>
            <button
              onClick={() => toggle(phaseId, id)}
              className="w-full flex items-start gap-3 rounded-lg border border-base-700 bg-base-900 px-3.5 py-2.5 text-left hover:border-base-500 transition-colors"
            >
              <span
                className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border ${
                  checked
                    ? "bg-signal-done/20 border-signal-done text-signal-done"
                    : "border-base-500"
                }`}
              >
                {checked && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4.5L4 7.5L10 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={`text-sm ${checked ? "text-base-400 line-through" : "text-base-200"}`}>
                {item}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

import { ExternalLink, Library } from "lucide-react";

const LINKS = [
  { label: "Branches", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches" },
  { label: "Pull Requests", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests" },
  { label: "Issues", url: "https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues" },
  { label: "GitHub Actions", url: "https://docs.github.com/en/actions" },
  { label: "GitHub CLI", url: "https://cli.github.com/manual/" },
  { label: "GitHub security & secrets", url: "https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository" },
  { label: "JPMorganChase Tech for Social Good", url: "https://www.jpmorgan.com/technology/technology-for-social-good" },
];

export function Resources() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-base-400 text-xs font-mono tracking-wide mb-2">
          <Library size={13} /> RESOURCES
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-base-100 tracking-tight">Official references</h1>
        <p className="mt-2 max-w-2xl text-base-300 text-[15px]">
          This site is a practical preparation framework built for CFG-style hackathons — it isn't an official
          JPMorganChase product and doesn't reproduce any confidential CFG process or judging criteria. For the
          real thing, go to the source.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {LINKS.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 rounded-lg border border-base-700 bg-base-900 px-4 py-3 text-sm text-base-200 hover:border-signal-info transition-colors"
          >
            {l.label}
            <ExternalLink size={14} className="shrink-0 text-base-500" />
          </a>
        ))}
      </div>
    </div>
  );
}

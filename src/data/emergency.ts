export interface EmergencyCase {
  id: string;
  title: string;
  whatHappened: string;
  doThis: string[];
  command?: string;
  dontDo?: string;
  danger?: boolean;
}

export const EMERGENCIES: EmergencyCase[] = [
  {
    id: "committed-main",
    title: "I accidentally committed to main",
    whatHappened: "You committed directly to main instead of a feature branch.",
    doThis: [
      "Don't push yet if you haven't already.",
      "Move the commit onto a new branch, then reset main back.",
    ],
    command: "git branch feature/my-work\ngit reset --hard origin/main\ngit switch feature/my-work",
    dontDo: "Don't force-push over main to 'fix' it — ask your team lead first if it's already pushed.",
    danger: true,
  },
  {
    id: "push-rejected",
    title: "Push rejected",
    whatHappened: "GitHub rejected your push — usually because the remote branch has commits you don't have locally.",
    doThis: ["Pull first to merge in the missing commits.", "Resolve any conflicts, then push again."],
    command: "git pull origin <branch>\n# resolve conflicts if any\ngit push",
  },
  {
    id: "merge-conflict",
    title: "Merge conflict",
    whatHappened: "Git can't automatically combine two sets of changes to the same lines.",
    doThis: ["Stop editing randomly.", "Open each conflicted file and choose the correct code.", "Remove the conflict markers, save, then commit."],
    command: "git status\n# fix files, then:\ngit add .\ngit commit",
  },
  {
    id: "deleted-branch",
    title: "I deleted my branch",
    whatHappened: "You deleted a branch, possibly with unmerged work on it.",
    doThis: ["Check reflog for the last commit hash on that branch.", "Recreate the branch from that commit."],
    command: "git reflog\ngit branch feature/recovered <commit-hash>",
  },
  {
    id: "lost-changes",
    title: "I lost my changes",
    whatHappened: "Uncommitted work seems to have disappeared.",
    doThis: ["Check the stash — it may be sitting there.", "Check reflog if you think a commit was involved."],
    command: "git stash list\ngit reflog",
  },
  {
    id: "committed-env",
    title: "I committed .env",
    whatHappened: "A file with secrets got committed to the repo.",
    doThis: [
      "Remove it from tracking and add it to .gitignore immediately.",
      "Rotate any real secrets that were in it — assume they're compromised.",
    ],
    command: "git rm --cached .env\necho .env >> .gitignore\ngit commit -m \"Remove .env from tracking\"",
    dontDo: "Don't just delete the file — the secret is still in your git history until you rotate it.",
    danger: true,
  },
  {
    id: "pushed-api-key",
    title: "I pushed an API key",
    whatHappened: "A real API key or credential was pushed to GitHub — possibly a public repo.",
    doThis: ["Rotate / revoke the key immediately at the provider, before anything else.", "Remove it from the codebase and future commits."],
    command: "# 1. Revoke the key at the provider FIRST\n# 2. Then remove it from the repo\ngit rm --cached path/to/file\ngit commit -m \"Remove leaked key\"",
    dontDo: "Don't treat removing it from the latest commit as enough — it's still in history until rotated.",
    danger: true,
  },
  {
    id: "reset-hard",
    title: "I ran git reset --hard",
    whatHappened: "You reset your branch and may have discarded uncommitted work.",
    doThis: ["Check reflog immediately — commits are usually still recoverable for a while.", "If the lost work was never committed, it likely can't be recovered."],
    command: "git reflog\ngit reset --hard <commit-hash-from-reflog>",
    danger: true,
  },
  {
    id: "teammate-disappeared",
    title: "Teammate's changes disappeared",
    whatHappened: "A merge or force-push seems to have overwritten someone's work.",
    doThis: ["Check reflog and the PR history for the missing commits.", "Recover the commit and re-apply it, ideally via a new PR."],
    command: "git log --all --oneline | grep <keyword>\ngit cherry-pick <commit-hash>",
  },
  {
    id: "wrong-branch",
    title: "Wrong branch",
    whatHappened: "You made commits on the wrong branch.",
    doThis: ["Move the commits to the correct branch, then remove them from the wrong one."],
    command: "git branch correct-branch\ngit reset --hard origin/main\ngit switch correct-branch",
  },
  {
    id: "wrong-commit",
    title: "Wrong commit",
    whatHappened: "You need to undo or edit a specific commit.",
    doThis: ["If it's not pushed: amend it.", "If it's already pushed and shared: revert it instead."],
    command: "git commit --amend\n# or, if already pushed:\ngit revert <commit-hash>",
  },
  {
    id: "server-broke",
    title: "Server stopped working after merge",
    whatHappened: "The app worked before a merge and doesn't now.",
    doThis: ["Check the terminal error first.", "Reinstall dependencies in case package.json changed.", "Compare the diff introduced by the merge."],
    command: "npm install\ngit diff HEAD~1 HEAD -- server/",
  },
];

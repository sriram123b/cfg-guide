export interface RunScenario {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  code?: string;
  followUp?: string;
}

export const WHAT_TO_RUN: RunScenario[] = [
  {
    id: "start",
    question: "I want to start working",
    keywords: ["start", "begin", "new feature", "work"],
    code: "git switch main\ngit pull\ngit switch -c feature/<your-feature>",
    answer: "You're ready to code.",
  },
  {
    id: "get-teammate-code",
    question: "I need my teammate's code",
    keywords: ["teammate", "latest", "sync", "update"],
    code: "git switch main\ngit pull",
    answer: "Then merge or rebase main into your feature branch if you're mid-feature.",
  },
  {
    id: "save-work",
    question: "I need to save my work",
    keywords: ["save", "commit", "push"],
    code: 'git status\ngit add .\ngit commit -m "describe your change"\ngit push',
    answer: "Your work is now safely backed up on GitHub.",
  },
  {
    id: "merge-conflict",
    question: "I have a merge conflict",
    keywords: ["conflict", "merge conflict"],
    code: "git status",
    answer: "Open the flagged files, choose the correct code between the conflict markers, then commit. See the Emergency page for the full walkthrough.",
    followUp: "/emergency",
  },
  {
    id: "committed-main",
    question: "I accidentally committed to main",
    keywords: ["main", "committed to main", "wrong branch main"],
    code: "git branch feature/my-work\ngit reset --hard origin/main\ngit switch feature/my-work",
    answer: "Your commit now lives safely on a feature branch instead of main.",
    followUp: "/emergency",
  },
  {
    id: "push-rejected",
    question: "Push rejected",
    keywords: ["rejected", "push failed", "non-fast-forward"],
    code: "git pull origin <branch>\ngit push",
    answer: "Someone pushed before you — pull their changes in first.",
  },
  {
    id: "create-pr",
    question: "I need to create a PR",
    keywords: ["pr", "pull request", "review"],
    code: "git push -u origin <your-branch>\n# then open a Pull Request on GitHub",
    answer: "Fill in the PR template, request a reviewer, and wait for at least one approval before merging.",
    followUp: "/pull-requests",
  },
  {
    id: "lost-changes",
    question: "I lost my changes",
    keywords: ["lost", "disappeared", "gone"],
    code: "git stash list\ngit reflog",
    answer: "Check the stash first, then reflog — most 'lost' work is still recoverable.",
    followUp: "/emergency",
  },
  {
    id: "undo-commit",
    question: "I need to undo a commit",
    keywords: ["undo", "revert", "reset commit"],
    code: "# not pushed yet:\ngit reset --soft HEAD~1\n\n# already pushed / shared:\ngit revert <commit-hash>",
    answer: "Use reset only for commits nobody else has pulled. Use revert once it's shared.",
  },
];

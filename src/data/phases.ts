export interface PhaseCommand {
  label: string;
  code: string;
  why: string;
}

export interface Phase {
  id: string;
  num: string;
  title: string;
  route: string;
  goal: string;
  roles: string[];
  githubActions: string[];
  commands: PhaseCommand[];
  mistakes: string[];
  checklist: string[];
  nextLabel: string;
}

export const PHASES: Phase[] = [
  {
    id: "01",
    num: "01",
    title: "Setup",
    route: "/team",
    goal: "Get every teammate identified, roled, and able to push code before anyone opens an editor.",
    roles: ["Team Lead", "Frontend", "Backend", "Database", "Integration/Testing"],
    githubActions: ["Create the repository", "Add every teammate as a collaborator", "Confirm everyone can clone and push"],
    commands: [
      {
        label: "Clone the repo",
        code: "git clone https://github.com/<org>/<repo>.git\ncd <repo>",
        why: "Everyone needs a local copy before they can branch or commit.",
      },
      {
        label: "Confirm your identity is set",
        code: 'git config user.name "Your Name"\ngit config user.email "you@example.com"',
        why: "Commits without this are attributed to nobody — fix it before your first commit.",
      },
    ],
    mistakes: ["Starting to code before everyone has push access.", "Skipping roles because \"we'll figure it out\" — you won't, under time pressure."],
    checklist: [
      "All team members entered with GitHub usernames",
      "Roles assigned (overlap is fine)",
      "Repository created",
      "Every teammate confirmed as a collaborator",
      "Everyone has successfully cloned the repo",
    ],
    nextLabel: "Understand the problem",
  },
  {
    id: "02",
    num: "02",
    title: "Understand Problem",
    route: "/problem",
    goal: "Agree on what you're building — and what you're deliberately not building — before writing code.",
    roles: ["Whole team"],
    githubActions: ["Optional: pin the problem summary in a GitHub Discussion or the README"],
    commands: [],
    mistakes: [
      "Starting to code before the team agrees on the MVP.",
      "Letting 'must-have' quietly grow to include everything.",
    ],
    checklist: [
      "Problem statement written down",
      "Target users identified",
      "Pain points listed",
      "Proposed solution agreed by the whole team",
      "Every feature sorted into Must / Should / Could / Later",
      "Success criteria defined",
    ],
    nextLabel: "Plan architecture",
  },
  {
    id: "03",
    num: "03",
    title: "Plan Architecture",
    route: "/architecture",
    goal: "Pick a frontend, backend, and database the whole team commits to — so nobody builds on a foundation someone else abandons.",
    roles: ["Team Lead", "Frontend", "Backend", "Database"],
    githubActions: ["Record the stack decision in the README", "Create matching folder structure (client/, server/)"],
    commands: [
      {
        label: "Scaffold the structure",
        code: "mkdir client server\ncd client && npm create vite@latest . -- --template react\ncd ../server && npm init -y",
        why: "Separate folders keep frontend and backend dependencies from colliding.",
      },
    ],
    mistakes: ["Changing the stack mid-hackathon without telling everyone.", "Picking a database nobody on the team has used before, under time pressure."],
    checklist: ["Frontend chosen", "Backend chosen", "Database chosen", "Architecture diagram agreed by the team", "Stack recorded in the README"],
    nextLabel: "Set up GitHub",
  },
  {
    id: "04",
    num: "04",
    title: "Set Up GitHub",
    route: "/github-setup",
    goal: "Turn the repository into a structure that supports five people working at once without stepping on each other.",
    roles: ["Team Lead"],
    githubActions: ["Add a README, .gitignore, and LICENSE", "Protect main", "Create feature branches"],
    commands: [
      {
        label: "Create a feature branch",
        code: "git switch main\ngit pull\ngit switch -c feature/login",
        why: "You create an isolated branch instead of modifying main directly.",
      },
      {
        label: "Add a .gitignore",
        code: "npx gitignore node",
        why: "Keeps node_modules, .env, and build output out of version control.",
      },
    ],
    mistakes: ["Everyone committing straight to main.", "No .gitignore — someone eventually commits node_modules or a .env file."],
    checklist: [
      "Repository has README, .gitignore, LICENSE if needed",
      "main is protected (no direct pushes)",
      "Feature branches created for each work area",
      "Every teammate knows the branch naming convention",
    ],
    nextLabel: "Parallel development",
  },
  {
    id: "05",
    num: "05",
    title: "Parallel Development",
    route: "/tasks",
    goal: "Everyone builds their piece on their own branch, in parallel, without blocking each other.",
    roles: ["Frontend", "Backend", "Database"],
    githubActions: ["Track work as tasks or GitHub Issues", "Push to your feature branch regularly"],
    commands: [
      {
        label: "Save your work",
        code: 'git status\ngit add .\ngit commit -m "Add login page"\ngit push -u origin feature/login',
        why: "Small, regular commits and pushes mean nobody ever loses more than a few minutes of work.",
      },
      {
        label: "Get your teammate's code",
        code: "git switch main\ngit pull",
        why: "Pulling main regularly means your branch never drifts too far from everyone else's work.",
      },
    ],
    mistakes: ["Working for hours without a single commit.", "Never pulling main, so your branch is unmergeable by the time you're done."],
    checklist: [
      "Every task has an owner and a branch",
      "Tasks are moving from To Do → In Progress → Done",
      "Commits are small and pushed regularly",
      "No one has been on the same branch uncommitted for more than an hour",
    ],
    nextLabel: "Integration",
  },
  {
    id: "06",
    num: "06",
    title: "Integration",
    route: "/integration",
    goal: "Stop building isolated features and prove one complete user journey works end to end.",
    roles: ["Integration/Testing", "Frontend", "Backend"],
    githubActions: ["Merge feature branches via PRs, one at a time", "Resolve conflicts as they appear"],
    commands: [
      {
        label: "Merge the latest main into your branch",
        code: "git switch feature/dashboard\ngit pull origin main",
        why: "Merging main into your branch regularly surfaces conflicts early, in small pieces.",
      },
    ],
    mistakes: ["Merging everything at once, an hour before the deadline.", "No one actually clicks through the full user flow until integration day."],
    checklist: [
      "Backend and frontend both running together",
      "API URLs and ports agreed and correct",
      "CORS configured",
      "At least one full user flow works end to end",
    ],
    nextLabel: "Testing",
  },
  {
    id: "07",
    num: "07",
    title: "Testing",
    route: "/testing",
    goal: "Break your own app before the judges do.",
    roles: ["Integration/Testing", "Whole team"],
    githubActions: ["Open issues for bugs found", "Fix on a branch, PR back into main"],
    commands: [
      {
        label: "Check what changed before testing",
        code: "git log --oneline -10\ngit diff main",
        why: "Know exactly what's new before you go looking for what broke.",
      },
    ],
    mistakes: ["Only testing the happy path.", "Testing on one person's laptop only — it works there, but not on a fresh clone."],
    checklist: [
      "Every critical user flow tested end to end",
      "Errors and empty states checked, not just the happy path",
      "App tested on a fresh clone, not just the dev's machine",
      "Known bugs logged, not just remembered",
    ],
    nextLabel: "Final polish",
  },
  {
    id: "08",
    num: "08",
    title: "Final Polish",
    route: "/final-hours",
    goal: "Make what already works look and feel finished — without touching what already works.",
    roles: ["Whole team"],
    githubActions: ["Merge only what's tested", "Freeze architecture changes"],
    commands: [
      {
        label: "Tag a known-good point before risky changes",
        code: "git tag pre-polish\ngit push origin pre-polish",
        why: "Gives you an easy rollback point if a \"quick\" UI change breaks something.",
      },
    ],
    mistakes: ["Starting a new feature with under 3 hours left.", "Refactoring working code for style reasons this late."],
    checklist: ["Major architecture changes frozen", "UI polish pass done", "Demo data looks realistic, not like 'asdf' and 'test123'", "README up to date"],
    nextLabel: "Submission",
  },
  {
    id: "09",
    num: "09",
    title: "Submission",
    route: "/final-checklist",
    goal: "Confirm the repository itself is judge-ready — it builds, it runs, and it's clean.",
    roles: ["Team Lead"],
    githubActions: ["Final check that main builds", "Confirm no secrets are committed"],
    commands: [
      {
        label: "Confirm a clean, working main",
        code: "git switch main\ngit pull\nnpm install\nnpm run build",
        why: "This is exactly what a judge — or a fresh laptop — will run. If it fails here, it fails for them.",
      },
    ],
    mistakes: ["Submitting with an open PR that never got merged.", "An exposed API key sitting in a committed .env file."],
    checklist: [
      "main builds with no errors",
      "No exposed API keys or secrets",
      "Setup instructions in the README actually work",
      "Repository is organized — no leftover junk files",
    ],
    nextLabel: "Demo",
  },
  {
    id: "10",
    num: "10",
    title: "Demo / Presentation",
    route: "/demo",
    goal: "Tell the story of the problem and show the solution working, live.",
    roles: ["Whole team"],
    githubActions: ["Have the repository open and ready as a fallback visual"],
    commands: [],
    mistakes: ["Live-coding a fix during the demo.", "No plan B if the live demo breaks."],
    checklist: [
      "Demo script practiced at least once, out loud",
      "Screenshots or a backup video recorded",
      "Someone assigned to drive the keyboard",
      "Failure plan agreed by the team",
    ],
    nextLabel: "You're done — good luck out there.",
  },
];

export const getPhase = (id: string) => PHASES.find((p) => p.id === id);
export const getPhaseByRoute = (route: string) => PHASES.find((p) => p.route === route);

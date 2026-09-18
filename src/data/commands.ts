export type Risk = "safe" | "caution" | "danger";

export interface GitCommand {
  cmd: string;
  what: string;
  when: string;
  example: string;
  risk: Risk;
}

export const GIT_COMMANDS: GitCommand[] = [
  { cmd: "git clone", what: "Downloads a full copy of a repository to your machine.", when: "Once, at the very start.", example: "git clone https://github.com/org/repo.git", risk: "safe" },
  { cmd: "git status", what: "Shows what's changed, staged, or untracked.", when: "Constantly — run it before and after almost anything.", example: "git status", risk: "safe" },
  { cmd: "git add", what: "Stages changes so they're included in the next commit.", when: "Before every commit.", example: "git add .", risk: "safe" },
  { cmd: "git commit", what: "Saves staged changes as a snapshot with a message.", when: "Whenever you finish a small, meaningful chunk of work.", example: 'git commit -m "Add login form validation"', risk: "safe" },
  { cmd: "git push", what: "Uploads your local commits to GitHub.", when: "After committing, regularly.", example: "git push -u origin feature/login", risk: "safe" },
  { cmd: "git pull", what: "Downloads and merges the latest changes from GitHub.", when: "Before starting new work, and often during it.", example: "git pull", risk: "safe" },
  { cmd: "git fetch", what: "Downloads changes from GitHub without merging them.", when: "When you want to see what's new before merging.", example: "git fetch origin", risk: "safe" },
  { cmd: "git switch", what: "Moves you to a different branch.", when: "To start work on a feature or go back to main.", example: "git switch feature/dashboard", risk: "safe" },
  { cmd: "git branch", what: "Lists, creates, or deletes branches.", when: "To see what branches exist or clean up merged ones.", example: "git branch -d feature/old-thing", risk: "caution" },
  { cmd: "git merge", what: "Combines another branch's history into your current branch.", when: "During integration, after a PR is approved.", example: "git merge feature/login", risk: "caution" },
  { cmd: "git rebase", what: "Replays your commits on top of another branch's history.", when: "To keep a clean, linear history — use with care on shared branches.", example: "git rebase main", risk: "caution" },
  { cmd: "git stash", what: "Temporarily shelves uncommitted changes.", when: "When you need to switch branches without committing half-finished work.", example: "git stash", risk: "safe" },
  { cmd: "git restore", what: "Discards local changes to a file.", when: "To undo edits you don't want, before committing.", example: "git restore src/App.tsx", risk: "caution" },
  { cmd: "git reset", what: "Moves the branch pointer, optionally discarding commits or changes.", when: "To undo commits — know the difference between --soft and --hard.", example: "git reset --soft HEAD~1", risk: "danger" },
  { cmd: "git revert", what: "Creates a new commit that undoes a previous one.", when: "The safe way to undo a commit that's already pushed and shared.", example: "git revert <commit-hash>", risk: "safe" },
  { cmd: "git reflog", what: "Shows a log of everywhere HEAD has pointed — your safety net.", when: "When you think you've lost commits.", example: "git reflog", risk: "safe" },
  { cmd: "git log", what: "Shows commit history.", when: "To see what's happened on a branch.", example: "git log --oneline -10", risk: "safe" },
  { cmd: "git diff", what: "Shows exactly what's changed, line by line.", when: "Before committing, or to review someone else's branch.", example: "git diff main", risk: "safe" },
  { cmd: "git remote", what: "Manages connections to remote repositories like GitHub.", when: "To check or fix where 'origin' points.", example: "git remote -v", risk: "safe" },
];

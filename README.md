# 🚀 CFG Team Command Center

The GitHub & team workflow guide for JPMorgan Chase Code for Good hackathons — a step-by-step command center your team keeps open from kickoff to demo.

This is a practical preparation framework built for CFG-style hackathons. It does not reproduce any confidential JPMorganChase process, materials, or judging criteria — see the in-app Resources page for official links.

## What it does

- A 10-phase hackathon timeline (Setup → Demo) with a goal, roles, GitHub actions, copyable commands, common mistakes, and a checklist for every phase
- Team roster, MVP feature sorter, architecture picker, Kanban task board, and an API contract tracker
- A PR workflow wizard, a searchable Git cheat sheet, and a "What do I run?" search for git situations
- A Git Emergency Room for the specific ways a hackathon repo goes wrong (merge conflicts, leaked secrets, lost commits, and more)
- A final-hours countdown and a pre-submission checklist
- Everything is saved to `localStorage` — refreshing the page never loses progress, and the app works fully offline once loaded

## Tech stack

React + TypeScript + Vite + Tailwind CSS + React Router + Zustand + lucide-react. No backend.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with `npm run preview`.

## Reset progress

Use the "Reset hackathon" button at the bottom of the sidebar to clear all locally stored progress and start over.

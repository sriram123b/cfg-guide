import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  TeamMember,
  Task,
  ProblemDoc,
  ArchitectureChoice,
  ApiEndpoint,
  ChecklistState,
  Status,
  StandupNote,
  Decision,
  HackathonClock,
} from "./types";
import { PHASES } from "./data/phases";

const seedTeam: TeamMember[] = [
  { id: "m1", name: "Alex", role: "Team Lead", github: "alex-dev" },
  { id: "m2", name: "Sam", role: "Frontend", github: "sam-codes" },
  { id: "m3", name: "Rahul", role: "Backend", github: "rahul-b" },
  { id: "m4", name: "Priya", role: "Database", github: "priya-db" },
  { id: "m5", name: "Arjun", role: "Integration/Testing", github: "arjun-qa" },
];

const seedProblem: ProblemDoc = {
  problem:
    "A fictional nonprofit needs a better way to connect volunteers with local community programs — right now sign-ups happen over scattered spreadsheets and phone calls.",
  targetUsers: "Volunteers looking for opportunities, and program coordinators who need reliable sign-ups.",
  painPoints: "No central place to browse programs. Coordinators can't see who's actually committed. No reminders.",
  existingSolution: "A shared spreadsheet and a group chat.",
  proposedSolution: "Community Connect: a web app where coordinators post programs and volunteers can browse, filter, and sign up in one click.",
  constraints: "Must ship a working demo in the hackathon window. No paid services.",
  successCriteria: "A volunteer can find a program and sign up; a coordinator can see who signed up — end to end, live.",
  features: [
    { id: "f1", name: "Browse programs list", tier: "must" },
    { id: "f2", name: "Sign up for a program", tier: "must" },
    { id: "f3", name: "Coordinator dashboard of signups", tier: "must" },
    { id: "f4", name: "Login / auth", tier: "should" },
    { id: "f5", name: "Email confirmation", tier: "could" },
    { id: "f6", name: "Volunteer hour tracking + certificates", tier: "later" },
  ],
};

const seedTasks: Task[] = [
  { id: "t1", title: "Project setup", assignee: "Alex", branch: "main", status: "done", pr: "" },
  { id: "t2", title: "README", assignee: "Alex", branch: "main", status: "done", pr: "" },
  { id: "t3", title: "Dashboard UI", assignee: "Sam", branch: "feature/dashboard", status: "in-progress", pr: "" },
  { id: "t4", title: "Program API", assignee: "Rahul", branch: "feature/api", status: "in-progress", pr: "" },
  { id: "t5", title: "Login page", assignee: "Sam", branch: "feature/login", status: "todo", pr: "" },
  { id: "t6", title: "Database schema", assignee: "Priya", branch: "feature/database", status: "todo", pr: "" },
  { id: "t7", title: "End-to-end testing", assignee: "Arjun", branch: "-", status: "todo", pr: "" },
];

const seedApi: ApiEndpoint[] = [
  {
    id: "a1",
    endpoint: "/api/health",
    method: "GET",
    request: "-",
    response: '{ "status": "ok" }',
    error: "-",
    owner: "Rahul",
    status: "done",
  },
  {
    id: "a2",
    endpoint: "/api/programs",
    method: "GET",
    request: "-",
    response: "[{ id, title, org, date, spotsLeft }]",
    error: "500 on DB failure",
    owner: "Rahul",
    status: "in-progress",
  },
  {
    id: "a3",
    endpoint: "/api/signup",
    method: "POST",
    request: "{ programId, name, email }",
    response: "{ confirmed: true }",
    error: "400 if program full",
    owner: "Rahul",
    status: "todo",
  },
];

interface StoreState {
  currentPhaseId: string;
  team: TeamMember[];
  problem: ProblemDoc;
  architecture: ArchitectureChoice;
  tasks: Task[];
  apiEndpoints: ApiEndpoint[];
  checklists: ChecklistState;
  standups: StandupNote[];
  decisions: Decision[];
  clock: HackathonClock;

  setCurrentPhase: (id: string) => void;
  addMember: (m: Omit<TeamMember, "id">) => void;
  removeMember: (id: string) => void;
  updateProblem: (p: Partial<ProblemDoc>) => void;
  addFeature: (name: string, tier: ProblemDoc["features"][number]["tier"]) => void;
  setFeatureTier: (id: string, tier: ProblemDoc["features"][number]["tier"]) => void;
  removeFeature: (id: string) => void;
  setArchitecture: (a: Partial<ArchitectureChoice>) => void;
  addTask: (t: Omit<Task, "id">) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  addApiEndpoint: (e: Omit<ApiEndpoint, "id">) => void;
  updateApiEndpoint: (id: string, patch: Partial<ApiEndpoint>) => void;
  removeApiEndpoint: (id: string) => void;
  toggleChecklistItem: (phaseId: string, itemId: string) => void;
  isChecked: (phaseId: string, itemId: string) => boolean;
  phaseProgress: (phaseId: string, totalItems: number) => number;
  overallProgress: () => number;
  resetAll: () => void;

  addStandup: (author: string, note: string) => void;
  removeStandup: (id: string) => void;
  addDecision: (text: string) => void;
  removeDecision: (id: string) => void;
  toggleTaskBlocked: (id: string, note?: string) => void;
  startClock: (durationHours: number) => void;
  stopClock: () => void;
}

const initialChecklists: ChecklistState = {};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      currentPhaseId: "01",
      team: seedTeam,
      problem: seedProblem,
      architecture: { frontend: "React", backend: "Node.js + Express", database: "PostgreSQL" },
      tasks: seedTasks,
      apiEndpoints: seedApi,
      checklists: initialChecklists,
      standups: [],
      decisions: [],
      clock: { startTime: null, durationHours: 24 },

      setCurrentPhase: (id) => set({ currentPhaseId: id }),

      addMember: (m) =>
        set((s) => ({ team: [...s.team, { ...m, id: crypto.randomUUID() }] })),
      removeMember: (id) => set((s) => ({ team: s.team.filter((m) => m.id !== id) })),

      updateProblem: (p) => set((s) => ({ problem: { ...s.problem, ...p } })),
      addFeature: (name, tier) =>
        set((s) => ({
          problem: {
            ...s.problem,
            features: [...s.problem.features, { id: crypto.randomUUID(), name, tier }],
          },
        })),
      setFeatureTier: (id, tier) =>
        set((s) => ({
          problem: {
            ...s.problem,
            features: s.problem.features.map((f) => (f.id === id ? { ...f, tier } : f)),
          },
        })),
      removeFeature: (id) =>
        set((s) => ({
          problem: { ...s.problem, features: s.problem.features.filter((f) => f.id !== id) },
        })),

      setArchitecture: (a) => set((s) => ({ architecture: { ...s.architecture, ...a } })),

      addTask: (t) => set((s) => ({ tasks: [...s.tasks, { ...t, id: crypto.randomUUID() }] })),
      updateTask: (id, patch) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      addApiEndpoint: (e) =>
        set((s) => ({ apiEndpoints: [...s.apiEndpoints, { ...e, id: crypto.randomUUID() }] })),
      updateApiEndpoint: (id, patch) =>
        set((s) => ({
          apiEndpoints: s.apiEndpoints.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),
      removeApiEndpoint: (id) =>
        set((s) => ({ apiEndpoints: s.apiEndpoints.filter((e) => e.id !== id) })),

      toggleChecklistItem: (phaseId, itemId) =>
        set((s) => ({
          checklists: {
            ...s.checklists,
            [phaseId]: {
              ...s.checklists[phaseId],
              [itemId]: !s.checklists[phaseId]?.[itemId],
            },
          },
        })),
      isChecked: (phaseId, itemId) => !!get().checklists[phaseId]?.[itemId],
      phaseProgress: (phaseId, totalItems) => {
        if (totalItems === 0) return 0;
        const done = Object.values(get().checklists[phaseId] || {}).filter(Boolean).length;
        return Math.round((done / totalItems) * 100);
      },
      overallProgress: () => {
        const all = PHASES.map((p) => get().phaseProgress(p.id, p.checklist.length));
        return Math.round(all.reduce((a, b) => a + b, 0) / all.length);
      },

      resetAll: () =>
        set({
          currentPhaseId: "01",
          team: seedTeam,
          problem: seedProblem,
          architecture: { frontend: "React", backend: "Node.js + Express", database: "PostgreSQL" },
          tasks: seedTasks,
          apiEndpoints: seedApi,
          checklists: {},
          standups: [],
          decisions: [],
          clock: { startTime: null, durationHours: 24 },
        }),

      addStandup: (author, note) =>
        set((s) => ({
          standups: [{ id: crypto.randomUUID(), time: Date.now(), author, note }, ...s.standups],
        })),
      removeStandup: (id) => set((s) => ({ standups: s.standups.filter((n) => n.id !== id) })),

      addDecision: (text) =>
        set((s) => ({
          decisions: [{ id: crypto.randomUUID(), time: Date.now(), text }, ...s.decisions],
        })),
      removeDecision: (id) => set((s) => ({ decisions: s.decisions.filter((d) => d.id !== id) })),

      toggleTaskBlocked: (id, note) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, blocked: !t.blocked, blockerNote: !t.blocked ? note || "" : "" } : t
          ),
        })),

      startClock: (durationHours) => set({ clock: { startTime: Date.now(), durationHours } }),
      stopClock: () => set({ clock: { startTime: null, durationHours: 24 } }),
    }),
    { name: "cfg-command-center" }
  )
);

export type { Status };

export type Status = "todo" | "in-progress" | "done";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  github: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  branch: string;
  status: Status;
  pr: string;
  blocked?: boolean;
  blockerNote?: string;
}

export type MvpTier = "must" | "should" | "could" | "later";

export interface Feature {
  id: string;
  name: string;
  tier: MvpTier;
}

export interface ProblemDoc {
  problem: string;
  targetUsers: string;
  painPoints: string;
  existingSolution: string;
  proposedSolution: string;
  constraints: string;
  successCriteria: string;
  features: Feature[];
}

export interface ArchitectureChoice {
  frontend: string;
  backend: string;
  database: string;
}

export interface ApiEndpoint {
  id: string;
  endpoint: string;
  method: string;
  request: string;
  response: string;
  error: string;
  owner: string;
  status: Status;
}

export interface ChecklistState {
  [phaseId: string]: {
    [itemId: string]: boolean;
  };
}

export interface StandupNote {
  id: string;
  time: number;
  author: string;
  note: string;
}

export interface Decision {
  id: string;
  time: number;
  text: string;
}

export interface HackathonClock {
  startTime: number | null;
  durationHours: number;
}

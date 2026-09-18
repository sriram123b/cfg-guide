import { Navigate } from "react-router-dom";
import { useStore } from "../store";
import { getPhase } from "../data/phases";

export function CurrentPhase() {
  const currentPhaseId = useStore((s) => s.currentPhaseId);
  const phase = getPhase(currentPhaseId);
  return <Navigate to={phase ? phase.route : "/team"} replace />;
}

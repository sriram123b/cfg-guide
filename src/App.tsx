import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { CurrentPhase } from "./pages/CurrentPhase";
import { Team } from "./pages/Team";
import { Problem } from "./pages/Problem";
import { Architecture } from "./pages/Architecture";
import { GithubSetup } from "./pages/GithubSetup";
import { Tasks } from "./pages/Tasks";
import { Server } from "./pages/Server";
import { ApiContract } from "./pages/ApiContract";
import { PullRequests } from "./pages/PullRequests";
import { Integration } from "./pages/Integration";
import { Testing } from "./pages/Testing";
import { Emergency } from "./pages/Emergency";
import { FinalHours } from "./pages/FinalHours";
import { FinalChecklist } from "./pages/FinalChecklist";
import { Demo } from "./pages/Demo";
import { CheatSheet } from "./pages/CheatSheet";
import { WhatNow } from "./pages/WhatNow";
import { Resources } from "./pages/Resources";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/current-phase" element={<CurrentPhase />} />
          <Route path="/team" element={<Team />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/github-setup" element={<GithubSetup />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/server" element={<Server />} />
          <Route path="/api-contract" element={<ApiContract />} />
          <Route path="/pull-requests" element={<PullRequests />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/final-hours" element={<FinalHours />} />
          <Route path="/final-checklist" element={<FinalChecklist />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/cheatsheet" element={<CheatSheet />} />
          <Route path="/what-now" element={<WhatNow />} />
          <Route path="/resources" element={<Resources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

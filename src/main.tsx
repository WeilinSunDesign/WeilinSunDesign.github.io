import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import ProjectsPage from "./ProjectsPage";
import AboutMe from "./AboutMe.tsx";
import VrVolunteerSystem from "./VrVolunteerSystem";
import SwiftfoodPage from "./swiftfood";
import HealthtechPage from "./healthtech";
import SmarthomePage from "./Smarthome";
import Other4Page from "./other-4";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/projects/volunteer" element={<VrVolunteerSystem />} />
        <Route path="/projects/swiftfood" element={<SwiftfoodPage />} />
        <Route path="/projects/healthtech" element={<HealthtechPage />} />
        <Route path="/projects/smarthome" element={<SmarthomePage />} />
        <Route path="/projects/other-4" element={<Other4Page />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
"use client";

import { useState } from "react";
import { theme } from "./theme";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./views/Dashboard";
import { Templates } from "./views/Templates";
import { Send } from "./views/Send";
import { Settings } from "./views/Settings";
import { INITIAL_TEMPLATES, INITIAL_HISTORY } from "./data/initialData";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [history, setHistory] = useState(INITIAL_HISTORY);

  return (
    <div style={{ display: "flex", height: "100vh", background: theme.bg }}>
      <Sidebar view={view} setView={setView} templateCount={templates.length} />

      <main style={{ flex: 1, overflow: "auto", padding: "36px 40px" }}>
        {view === "dashboard" && (
          <Dashboard templates={templates} history={history} setView={setView} />
        )}
        {view === "templates" && (
          <Templates templates={templates} setTemplates={setTemplates} />
        )}
        {view === "send" && (
          <Send templates={templates} setHistory={setHistory} />
        )}
        {view === "settings" && (
          <Settings />
        )}
      </main>
    </div>
  );
}
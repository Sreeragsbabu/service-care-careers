import { useState } from "react";
import Categories from "./Categories";
import Users from "./Users";
import Jobs from "./Jobs";
import Drawer from "@mui/material/Drawer";
import { Sidebar } from "./SideBar";

const DRAWER_WIDTH = 220;
const RAIL_WIDTH = 64;

export default function Admin() {
  const [page, setPage] = useState("Jobs");
  const [expanded, setExpanded] = useState(true);

  const drawerWidth = expanded ? DRAWER_WIDTH : RAIL_WIDTH;

  return (
    <div className="flex h-full overflow-hidden">
      <Drawer
        variant="permanent"
        open
        PaperProps={{
          style: {
            width: drawerWidth,
            border: "none",
            position: "relative", // ← KEY FIX: take it out of fixed positioning
            transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
            boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
            flexShrink: 0,
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            background: "#ffffff",
            borderRight: "1px solid #e2e8f0",
          },
        }}
      >
        <Sidebar
          page={page}
          setPage={setPage}
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
        />
      </Drawer>

      {/* Main content */}
      <div
        className="flex flex-col flex-1 min-w-0 overflow-hidden"
        style={{ transition: "margin-left 0.22s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {page === "Jobs" && <Jobs onNavigate={setPage} />}
          {page === "Categories" && <Categories onNavigate={setPage} />}
          {page === "Users" && <Users onNavigate={setPage} />}
        </main>
      </div>
    </div>
  );
}

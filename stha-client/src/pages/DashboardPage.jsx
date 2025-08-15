import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Layout from "../components/Layout";
import FloatingChatButton from "../chatcomponents/FloatingChatButton";
import TravelNewsFeed from "../components/TravelNewsFeed";

export default function DashboardPage() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* <Sidebar /> */}
      <Layout />
      <Box sx={{ flexGrow: 1 }}>
        {/* <Topbar /> */}
        <Box sx={{ p: 1, mt: 8 }}>
          <Outlet />
        </Box>
        {/* <div className="grid grid-cols-3 gap-4">
      <TravelNewsFeed />
    </div> */}
      </Box>
      <FloatingChatButton /> 
    </Box>
  );
}

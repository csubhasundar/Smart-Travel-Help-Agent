import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import MapIcon from "@mui/icons-material/Map";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Plan Journey",
      icon: <ExploreIcon />,
      path: "/dashboard/plan-journey",
    },
    {
      text: "Discover Nearby",
      icon: <ExploreIcon />,
      path: "/dashboard/discover-nearby",
    },
    {
      text: "Weather & Safety",
      icon: <WbSunnyIcon />,
      path: "/dashboard/weather-safety",
    },
    { text: "Map View", icon: <MapIcon />, path: "/dashboard/map-view" },
    {
      text: "Cost Analysis",
      icon: <CalculateIcon />,
      path: "/dashboard/cost-analysis",
    },
    {
      text: "Friend Share",
      icon: <ShareIcon />,
      path: "/dashboard/friend-share",
    },
    {
      text: "Friend Location",
      icon: <PeopleIcon />,
      path: "/dashboard/friend-location",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

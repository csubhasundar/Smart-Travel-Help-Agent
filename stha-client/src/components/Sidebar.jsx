import styles from "./Sidebar.module.css";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import PlanIcon from "@mui/icons-material/AddBox";
import MapIcon from "@mui/icons-material/Map";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Plan Journey", icon: <PlanIcon />, path: "/dashboard/plan-journey" },
    { text: "Discover Nearby", icon: <ExploreIcon />, path: "/dashboard/discover-nearby" },
    { text: "Weather & Safety", icon: <WbSunnyIcon />, path: "/dashboard/weather-safety" },
    { text: "Map View", icon: <MapIcon />, path: "/dashboard/map-view" },
    { text: "Cost Analysis", icon: <CalculateIcon />, path: "/dashboard/cost-analysis" },
    { text: "Friend Share", icon: <ShareIcon />, path: "/dashboard/friend-share" },
    { text: "Friend Location", icon: <PeopleIcon />, path: "/dashboard/friend-location" },
  ];

  const drawerContent = (
    <List className={collapsed ? styles.collapsedList : ""}>
      {menuItems.map((item) => (
        <Tooltip title={collapsed ? item.text : ""} placement="right" key={item.text}>
          <ListItemButton
            onClick={() => navigate(item.path)}
            className={styles.menuItem}
          >
            <ListItemIcon className={styles.icon}>{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.text} className={styles.text} />}
          </ListItemButton>
        </Tooltip>
      ))}
    </List>
  );

  return (
    <div className={styles.sidebarWrapper}>
      {/* Mobile Menu Button */}
      <IconButton
        className={styles.menuBtn}
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        className={`${styles.drawer} ${collapsed ? styles.drawerCollapsed : ""}`}
        classes={{
          paper: `${styles.drawerPaper} ${collapsed ? styles.drawerPaperCollapsed : ""}`,
        }}
      >
        <div className={styles.topSection}>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            className={styles.collapseBtn}
          >
            <MenuIcon />
          </IconButton>
        </div>
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        classes={{ paper: styles.drawerPaper }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}

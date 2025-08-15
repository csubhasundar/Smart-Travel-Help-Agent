import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip, AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import MapIcon from "@mui/icons-material/Map";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";
import CalculateIcon from "@mui/icons-material/Calculate";
import PlanIcon from "@mui/icons-material/AddBox";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//import "./Layout.css";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Plan Journey", icon: <PlanIcon />, path: "/dashboard/plan-journey" },
    { text: "Discover Nearby", icon: <ExploreIcon />, path: "/dashboard/discover-nearby" },
    { text: "Weather & Safety", icon: <WbSunnyIcon />, path: "/dashboard/weather-safety" },
    { text: "Live Travel News", icon: <NewspaperIcon />, path: "/dashboard/travel-news" },
    { text: "Map View", icon: <MapIcon />, path: "/dashboard/map-view" },
    { text: "Cost Analysis", icon: <CalculateIcon />, path: "/dashboard/cost-analysis" },
    { text: "Friend Share", icon: <ShareIcon />, path: "/dashboard/friend-share" },
    { text: "Friend Location", icon: <PeopleIcon />, path: "/dashboard/friend-location" },
  ];


  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  //   document.body.classList.toggle("dark-mode");
  // };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  const drawerContent = (
    <List className={collapsed ? "collapsedList" : ""}>
      {menuItems.map((item) => (
        <Tooltip title={collapsed ? item.text : ""} placement="right" key={item.text}>
          <ListItemButton onClick={() => navigate(item.path)} className={styles.menuItem}>
            <ListItemIcon className={styles.icon}>{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.text} className={styles.text} />}
          </ListItemButton>
        </Tooltip>
      ))}
    </List>
  );

  return (
    <ThemeProvider theme={theme}><CssBaseline />
    <div className={styles.layoutWrapper}>
      {/* Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          className={`drawer ${collapsed ? "drawerCollapsed" : ""}`}
          classes={{ paper: `drawerPaper ${collapsed ? "drawerPaperCollapsed" : ""}` }}
        >
          <div className={styles.topSection}>
            <IconButton onClick={() => setCollapsed(!collapsed)} className={styles.collapseBtn}>
              <MenuIcon />
            </IconButton>
          </div>
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          classes={{ paper: "drawerPaper" }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Topbar */}
      <AppBar position="fixed" className={styles.topbar} sx={{ ml: !isMobile ? (collapsed ? "70px" : "240px") : 0 }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}

          {/* <Typography variant="h6" fontWeight="bold" className="title">
            Smart Travel Help Agent
          </Typography> */}

          {/* Logo & Title */}
                  <div className={styles.logoSection}>
                    <img className={styles.logo} src="../../../holiday-trip.png" alt="Logo" />
                    <Typography variant="h6" className={styles.title}>
                      Smart Travel Help Agent
                    </Typography>
                  </div>

          <div className={styles.topbarActions}>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Typography variant="body1" sx={{ mr: 2, fontWeight: "bold" }}>
              {userName}
            </Typography>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar>{userName.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => setAnchorEl(null)}>View Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <main className={styles.mainContent} style={{ marginLeft: !isMobile ? (collapsed ? "70px" : "240px") : 0 }}>
        <Toolbar />
        {children}
      </main>
    </div>
    </ThemeProvider>
  );
}

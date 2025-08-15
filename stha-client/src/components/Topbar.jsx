import styles from "./Topbar.module.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";

export default function Topbar({ collapsed, onMenuClick, onToggleTheme, theme }) {
  const userName = localStorage.getItem("userName") || "User";
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  const sidebarWidth = isMobile ? 0 : collapsed ? 70 : 240;

  return (
    <AppBar
      position="fixed"
      className={styles.topbar}
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
      }}
    >
      <Toolbar className={styles.toolbar}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton edge="start" onClick={onMenuClick} className={styles.iconBtn}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo & Title */}
        <div className={styles.logoSection}>
          <img className={styles.logo} src="../../../holiday-trip.png" alt="Logo" />
          <Typography variant="h6" className={styles.title}>
            Smart Travel Help Agent
          </Typography>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Theme Switch */}
          <IconButton onClick={onToggleTheme} className={styles.iconBtn}>
            {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Username */}
          {!isMobile && <Typography className={styles.username}>{userName}</Typography>}

          {/* Profile Menu */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar className={styles.avatar}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

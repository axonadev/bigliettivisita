import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";

const menuItems = [
  { to: "/home", icon: <HomeIcon />, label: "Home" },
  { to: "/about", icon: <InfoIcon />, label: "About" },
  { to: "/contact", icon: <ContactMailIcon />, label: "Contact" },
];

const SideMenu = () => {
  return (
    <Box
      sx={{ width: 72, bgcolor: "background.paper", height: "100vh", py: 2 }}
    >
      <List>
        {menuItems.map(({ to, icon, label }) => (
          <ListItem key={to} disablePadding sx={{ justifyContent: "center" }}>
            <Tooltip title={label} placement="right">
              <ListItemButton
                component={Link}
                to={to}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: 56,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: "inherit" }}>
                  {icon}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideMenu;

import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserMenu = ({ anchorEl, open, onClose }) => {
  // Esempio di handler per le voci
  const handleInfo = () => {
    // Azione per info
    onClose();
  };
  const handleProfile = () => {
    // Azione per profilo
    onClose();
  };
  const handleSettings = () => {
    // Azione per impostazioni
    onClose();
  };
  const handleLogout = () => {
    // Azione per logout
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 4,
        sx: { mt: 1.5, minWidth: 200, borderRadius: 2 },
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        Profilo
      </MenuItem>
      <MenuItem onClick={handleSettings}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Impostazioni
      </MenuItem>
      <MenuItem onClick={handleInfo}>
        <ListItemIcon>
          <InfoIcon fontSize="small" />
        </ListItemIcon>
        Info
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <Typography color="error.main">Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;

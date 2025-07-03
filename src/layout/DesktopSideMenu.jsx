import React from "react";
import { Box, IconButton } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import SideMenu from "../components/SideMenu";
import { getSideMenuStyles, getToggleButtonStyles } from "./styles";

/**
 * Componente per il menu laterale desktop
 */
const DesktopSideMenu = ({ isOpen, onToggle, dimensions, theme }) => {
  const sideMenuStyles = getSideMenuStyles({ dimensions, theme, isOpen });
  const toggleButtonStyles = getToggleButtonStyles(isOpen);

  return (
    <Box sx={sideMenuStyles}>
      <IconButton
        onClick={onToggle}
        size="small"
        sx={toggleButtonStyles}
        aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        title={isOpen ? "Chiudi menu" : "Apri menu"}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <SideMenu open={isOpen} width={dimensions.width} />
    </Box>
  );
};

export default DesktopSideMenu;

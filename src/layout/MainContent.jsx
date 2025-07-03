import React from "react";
import { Box } from "@mui/material";
import { getMainContentStyles } from "./styles";

/**
 * Componente per il contenuto principale
 */
const MainContent = ({ children, sideMenuWidth, isMobile }) => {
  const contentStyles = getMainContentStyles(sideMenuWidth, isMobile);

  return (
    <Box
      component="main"
      sx={contentStyles}
      role="main"
      aria-label="Contenuto principale"
    >
      {children}
    </Box>
  );
};

export default MainContent;

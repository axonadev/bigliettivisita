import { Box } from "@mui/material";
import { LAYOUT_CONSTANTS } from "./constants";

/**
 * Stili per il container principale del layout
 */
export const mainContainerStyles = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

/**
 * Stili per il container del contenuto
 */
export const contentContainerStyles = {
  flex: 1,
  display: "flex",
  position: "relative",
  bgcolor: "background.default",
  mt: `${LAYOUT_CONSTANTS.HEADER_HEIGHT}px`,
};

/**
 * Funzione per generare gli stili del menu laterale
 * @param {object} params - Parametri per gli stili
 * @returns {object} Oggetto con gli stili
 */
export const getSideMenuStyles = ({ dimensions, theme, isOpen }) => ({
  width: dimensions.width,
  minWidth: dimensions.minWidth,
  maxWidth: dimensions.maxWidth,
  transition: LAYOUT_CONSTANTS.TRANSITIONS.SIDEBAR,
  borderRight: `1px solid ${theme.palette.divider}`,
  bgcolor: "background.paper",
  position: "fixed",
  top: `${LAYOUT_CONSTANTS.HEADER_HEIGHT}px`,
  left: 0,
  height: `calc(100vh - ${LAYOUT_CONSTANTS.HEADER_HEIGHT}px)`,
  zIndex: LAYOUT_CONSTANTS.Z_INDEX.SIDEBAR,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  boxShadow: theme.shadows[2],
});

/**
 * Funzione per generare gli stili del pulsante toggle
 */
export const getToggleButtonStyles = (isOpen) => ({
  alignSelf: isOpen ? "flex-end" : "center",
  m: 1,
  mb: 0,
  transition: LAYOUT_CONSTANTS.TRANSITIONS.BUTTON,
  zIndex: LAYOUT_CONSTANTS.Z_INDEX.BUTTON,
  "&:hover": {
    transform: "scale(1.05)",
  },
});

/**
 * Funzione per generare gli stili del container principale del contenuto
 */
export const getMainContentStyles = (sideMenuWidth, isMobile) => ({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  transition: LAYOUT_CONSTANTS.TRANSITIONS.CONTENT,
  ml: !isMobile ? `${sideMenuWidth}px` : 0,
  height: `calc(100vh - ${LAYOUT_CONSTANTS.HEADER_HEIGHT}px)`,
  overflowY: "auto",
  overflowX: "hidden",
});

import React, { useState, useMemo } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Fab from "../components/Fab";
import DesktopSideMenu from "./DesktopSideMenu";
import MainContent from "./MainContent";

// Hooks and utilities
import useDevice from "../hooks/useDevice";
import { useSideMenuDimensions } from "./hooks";
import { LayoutContext } from "./LayoutContext";

// Styles
import { mainContainerStyles, contentContainerStyles } from "./styles";

/**
 * Layout principale dell'applicazione
 * Gestisce la struttura generale con header, sidebar, contenuto e footer
 */
const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { dimensions = { width: 0 } } = useDevice();

  // Stato del menu laterale
  const [sideMenuOpen, setSideMenuOpen] = useState(!isMobile);

  // Calcola le dimensioni del menu laterale
  const sideMenuDimensions = useSideMenuDimensions(
    sideMenuOpen,
    dimensions.width
  );

  // Handler per toggle del menu
  const handleToggleMenu = () => {
    setSideMenuOpen((prev) => !prev);
  };

  // Context value memoizzato per evitare re-render inutili
  const contextValue = useMemo(
    () => ({
      sideMenuOpen,
      setSideMenuOpen,
      isMobile,
      dimensions,
      sideMenuWidth: sideMenuDimensions.width,
    }),
    [sideMenuOpen, isMobile, dimensions, sideMenuDimensions.width]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      <Box sx={mainContainerStyles}>
        {/* Header fisso */}
        <Header />

        {/* Container principale del contenuto */}
        <Box sx={contentContainerStyles}>
          {/* Menu laterale per desktop */}
          {!isMobile && (
            <DesktopSideMenu
              isOpen={sideMenuOpen}
              onToggle={handleToggleMenu}
              dimensions={sideMenuDimensions}
              theme={theme}
            />
          )}

          {/* FAB per mobile */}
          {isMobile && <Fab />}

          {/* Contenuto principale */}
          <MainContent
            sideMenuWidth={sideMenuDimensions.width}
            isMobile={isMobile}
          >
            {children}
          </MainContent>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </LayoutContext.Provider>
  );
};

export default Layout;

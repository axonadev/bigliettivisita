import { useMemo } from "react";
import { LAYOUT_CONSTANTS } from "./constants";

/**
 * Hook per calcolare le dimensioni del menu laterale
 * @param {boolean} isOpen - Se il menu è aperto
 * @param {number} screenWidth - Larghezza dello schermo
 * @returns {object} Oggetto con le dimensioni del menu
 */
export const useSideMenuDimensions = (isOpen, screenWidth) => {
  return useMemo(() => {
    const { SIDEMENU } = LAYOUT_CONSTANTS;

    if (!isOpen) {
      return {
        width: SIDEMENU.MIN_WIDTH,
        minWidth: SIDEMENU.MIN_WIDTH,
        maxWidth: SIDEMENU.MIN_WIDTH,
      };
    }

    const calculatedWidth = Math.min(
      SIDEMENU.MAX_WIDTH,
      Math.max(screenWidth * SIDEMENU.RATIO, SIDEMENU.DEFAULT_WIDTH)
    );

    return {
      width: calculatedWidth,
      minWidth: SIDEMENU.DEFAULT_WIDTH,
      maxWidth: SIDEMENU.MAX_WIDTH,
    };
  }, [isOpen, screenWidth]);
};

/**
 * Hook per i breakpoints responsive
 * @param {object} theme - Tema MUI
 * @returns {object} Oggetto con i breakpoints
 */
export const useLayoutBreakpoints = (theme) => {
  return useMemo(
    () => ({
      isMobile: theme.breakpoints.down("sm"),
      isTablet: theme.breakpoints.between("sm", "md"),
      isDesktop: theme.breakpoints.up("md"),
    }),
    [theme.breakpoints]
  );
};

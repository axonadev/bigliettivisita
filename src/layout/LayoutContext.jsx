import { createContext, useContext } from "react";

/**
 * Context per condividere lo stato del layout
 */
export const LayoutContext = createContext({
  sideMenuOpen: true,
  setSideMenuOpen: () => {},
  isMobile: false,
  dimensions: { width: 0 },
});

/**
 * Hook per utilizzare il context del layout
 */
export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "useLayoutContext deve essere utilizzato all'interno di un LayoutProvider"
    );
  }
  return context;
};

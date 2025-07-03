// Layout constants
export const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: 64,
  SIDEMENU: {
    MAX_WIDTH: 300,
    MIN_WIDTH: 72,
    DEFAULT_WIDTH: 200,
    RATIO: 0.2, // 1/5 della larghezza
  },
  TRANSITIONS: {
    SIDEBAR: "width 0.3s cubic-bezier(.4,2,.6,1)",
    CONTENT: "margin 0.3s cubic-bezier(.4,2,.6,1)",
    BUTTON: "transform 0.2s",
  },
  Z_INDEX: {
    SIDEBAR: 1000,
    BUTTON: 1001,
    FAB: 1002,
  },
};

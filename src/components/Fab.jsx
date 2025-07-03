import React from "react";
import { Fab as MuiFab, Tooltip } from "@mui/material";
import { LinkedIn } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled component per posizionamento fisso
const StyledFab = styled(MuiFab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: "#0077b5", // Colore LinkedIn
  color: "white",
  "&:hover": {
    backgroundColor: "#005885",
    transform: "scale(1.1)",
  },
  transition: "all 0.3s ease-in-out",
  zIndex: 1000,
}));

const Fab = () => {
  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/alexandre-roux-6a1b7b1a3/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Tooltip title="Visita il profilo LinkedIn" placement="left" arrow>
      <StyledFab
        size="medium"
        aria-label="LinkedIn Profile"
        onClick={handleLinkedInClick}
      >
        <LinkedIn />
      </StyledFab>
    </Tooltip>
  );
};

export default Fab;

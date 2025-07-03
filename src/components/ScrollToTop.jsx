import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import PropTypes from "prop-types";

const ScrollToTop = ({
  showFeedback = false,
  feedbackMessage = "Tornato in cima",
}) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (showFeedback) setOpen(true);
  }, [pathname, showFeedback]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      {showFeedback && (
        <Snackbar
          open={open}
          autoHideDuration={1200}
          onClose={handleClose}
          message={feedbackMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      )}
    </>
  );
};

ScrollToTop.propTypes = {
  showFeedback: PropTypes.bool,
  feedbackMessage: PropTypes.string,
};

export default ScrollToTop;

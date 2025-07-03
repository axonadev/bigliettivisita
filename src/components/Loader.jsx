import {
  Box,
  CircularProgress,
  Backdrop,
  Typography,
  Fade,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const Loader = ({
  open = true,
  message = "Caricamento...",
  size = 60,
  showMessage = false,
  color = "primary",
}) => {
  const theme = useTheme();

  return (
    <Backdrop
      sx={{
        color: theme.palette.common.white,
        zIndex: theme.zIndex.modal + 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        flexDirection: "column",
        gap: 2,
      }}
      open={open}
    >
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress
            size={size}
            color={color}
            thickness={4}
            sx={{
              animationDuration: "1s",
            }}
          />
          {showMessage && (
            <Typography
              variant="body1"
              color="inherit"
              sx={{
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Fade>
    </Backdrop>
  );
};

Loader.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  size: PropTypes.number,
  showMessage: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ]),
};

export default Loader;

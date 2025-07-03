import { CircularProgress, Box, keyframes } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

// Animazione personalizzata per lo spinner
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled component per il wrapper dello spinner
const SpinnerWrapper = styled(Box)(({ theme, withPulse }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...(withPulse && {
    animation: `${pulseAnimation} 2s ease-in-out infinite`,
  }),
}));

const Spinner = ({
  size = 40,
  thickness = 3.6,
  color = "primary",
  variant = "indeterminate",
  withPulse = false,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <SpinnerWrapper withPulse={withPulse} sx={sx}>
      <CircularProgress
        size={size}
        thickness={thickness}
        color={color}
        variant={variant}
        sx={{
          animationDuration: "1.4s",
          ...props.sx,
        }}
        {...props}
      />
    </SpinnerWrapper>
  );
};

Spinner.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
    "inherit",
  ]),
  variant: PropTypes.oneOf(["determinate", "indeterminate"]),
  withPulse: PropTypes.bool,
  sx: PropTypes.object,
};

export default Spinner;

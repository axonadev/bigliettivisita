import React, { useMemo } from "react";
import { Avatar, IconButton, Tooltip, useTheme, alpha } from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const IconLogin = ({
  onClick = () => {},
  initials = "",
  size = 40,
  tooltip,
}) => {
  const theme = useTheme();

  // Selettori Redux per stato di login e dati utente
  const isLogged = useSelector((state) => state.auth?.value?.logged || false);
  const nomeSoggetto = useSelector(
    (state) => state.auth?.value?.nomesoggetto || ""
  );
  const cognomeSoggetto = useSelector(
    (state) => state.auth?.value?.cognomesoggetto || ""
  );

  // Calcola le iniziali in modo intelligente
  const userInitials = useMemo(() => {
    if (initials) return initials;

    if (nomeSoggetto && cognomeSoggetto) {
      return `${nomeSoggetto.charAt(0)}${cognomeSoggetto.charAt(
        0
      )}`.toUpperCase();
    }

    if (nomeSoggetto) {
      const names = nomeSoggetto.split(" ");
      if (names.length >= 2) {
        return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
      }
      return nomeSoggetto.charAt(0).toUpperCase();
    }

    return "U"; // Default per "User"
  }, [initials, nomeSoggetto, cognomeSoggetto]);

  // Genera un colore consistente basato sulle iniziali
  const avatarColor = useMemo(() => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      "#e91e63", // pink
      "#9c27b0", // purple
      "#673ab7", // deep purple
      "#3f51b5", // indigo
      "#2196f3", // blue
      "#00bcd4", // cyan
      "#009688", // teal
      "#4caf50", // green
      "#8bc34a", // light green
      "#ff9800", // orange
      "#ff5722", // deep orange
    ];

    const hash = userInitials.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  }, [userInitials, theme.palette]);

  // Tooltip dinamico
  const defaultTooltip = isLogged
    ? `Profilo utente - ${nomeSoggetto || "Utente"}`
    : "Accedi al tuo account";

  const tooltipText = tooltip || defaultTooltip;

  // Renderizza l'avatar per utente loggato
  const renderLoggedInAvatar = () => (
    <Avatar
      sx={{
        width: size,
        height: size,
        bgcolor: avatarColor,
        color: "white",
        fontSize: size * 0.4,
        fontWeight: "bold",
        border: `2px solid ${alpha(avatarColor, 0.3)}`,
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: `0 4px 12px ${alpha(avatarColor, 0.4)}`,
        },
      }}
    >
      {userInitials}
    </Avatar>
  );

  // Renderizza l'icona per utente non loggato
  const renderGuestIcon = () => (
    <Avatar
      sx={{
        width: size,
        height: size,
        bgcolor: theme.palette.grey[400],
        color: theme.palette.grey[600],
        transition: theme.transitions.create(
          ["transform", "background-color"],
          {
            duration: theme.transitions.duration.short,
          }
        ),
        "&:hover": {
          bgcolor: theme.palette.primary.main,
          color: "white",
          transform: "scale(1.1)",
        },
      }}
    >
      <LoginIcon sx={{ fontSize: size * 0.6 }} />
    </Avatar>
  );

  const avatarComponent = (
    <IconButton
      onClick={onClick}
      sx={{
        p: 0,
        position: "relative",
        "&:hover": {
          backgroundColor: "transparent",
        },
        // Indicatore di stato online (pallino verde)
        ...(isLogged && {
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 12,
            height: 12,
            backgroundColor: "#4caf50",
            borderRadius: "50%",
            border: `2px solid ${theme.palette.background.paper}`,
            zIndex: 1,
          },
        }),
      }}
      aria-label={isLogged ? "Menu utente" : "Accedi"}
    >
      {isLogged ? renderLoggedInAvatar() : renderGuestIcon()}
    </IconButton>
  );

  return (
    <Tooltip
      title={tooltipText}
      arrow
      placement="bottom-end"
      enterDelay={500}
      leaveDelay={200}
    >
      {avatarComponent}
    </Tooltip>
  );
};

export default IconLogin;

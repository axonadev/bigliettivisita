import React, { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { trigger } from "../store/isMenuOpen";

import UserMenu from "./UserMenu";
import IconLogin from "./IconLogin";

// Componente per nascondere l'header durante lo scroll
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({
    target: window,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = ({ loginVisible = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selettori Redux
  const nomeSoggetto = useSelector((state) => state.auth.value.nomesoggetto);
  const cognomeSoggetto = useSelector(
    (state) => state.auth.value.cognomesoggetto
  );
  // Stato locale per le iniziali
  const [iniziali, setIniziali] = useState("");

  // Stato per UserMenu
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  // Calcola le iniziali quando cambiano nome/cognome
  useEffect(() => {
    if (nomeSoggetto && cognomeSoggetto) {
      const inizialiCalcolate = `${nomeSoggetto.charAt(
        0
      )}.${cognomeSoggetto.charAt(0)}.`;
      setIniziali(inizialiCalcolate);
    }
  }, [nomeSoggetto, cognomeSoggetto]);

  // Funzioni di navigazione
  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  // Gestione apertura/chiusura UserMenu
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  // Memoizza il contenuto dell'avatar per evitare re-render
  const avatarContent = useMemo(() => {
    if (iniziali) {
      return iniziali;
    }
    return nomeSoggetto ? nomeSoggetto.charAt(0) : "U";
  }, [iniziali, nomeSoggetto]);

  return (
    <>
      {/* Header fisso - appare durante lo scroll */}

      <AppBar
        position="fixed"
        elevation={4}
        sx={{
          top: 0,
          backgroundColor: "primary.contrastText",
          backgroundImage: "url('https://picsum.photos/1200/300')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            variant="dense"
            sx={{
              minHeight: 60,
              justifyContent: "space-between",
              py: 1,
            }}
          >
            {/* Logo compatto */}
            <Box
              onClick={handleLogoClick}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                component="img"
                src="/icon/logo.png"
                alt="EventIMS Logo"
                sx={{
                  maxWidth: 100,
                  maxHeight: 40,
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Menu e utente compatti */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {loginVisible && (
                <>
                  <IconButton
                    onClick={() => navigate("/dashboard")}
                    sx={{
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                      },
                    }}
                    aria-label="Dashboard"
                  >
                    <DashboardIcon />
                  </IconButton>

                  <IconButton
                    onClick={handleUserMenuOpen}
                    sx={{
                      p: 0,
                      border: "1px solid",
                      borderColor: "primary.main",
                      "&:hover": {
                        borderColor: "primary.dark",
                      },
                    }}
                    aria-label="Menu utente"
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                      }}
                    >
                      {avatarContent}
                    </Avatar>
                  </IconButton>
                  <UserMenu
                    anchorEl={anchorEl}
                    open={openUserMenu}
                    onClose={handleUserMenuClose}
                  />
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;

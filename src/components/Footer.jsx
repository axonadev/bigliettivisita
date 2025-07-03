import React from "react";
import {
  Box,
  Typography,
  Container,
  Divider,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";
import { LinkedIn, GitHub, Email, Copyright } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <LinkedIn />,
      url: "https://www.linkedin.com/in/alexandre-roux-6a1b7b1a3/",
      label: "LinkedIn",
    },
    {
      icon: <GitHub />,
      url: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Email />,
      url: "mailto:contact@example.com",
      label: "Email",
    },
  ];

  const handleSocialClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: "auto",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Sezione principale del footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            gap: 2,
            mb: 2,
          }}
        >
          {/* Informazioni azienda */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                mb: 1,
              }}
            >
              EventIMS
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 300 }}
            >
              Sistema di gestione eventi innovativo e intuitivo
            </Typography>
          </Box>

          {/* Link utili */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Link Utili
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link
                href="/dashboard"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                Dashboard
              </Link>
              <Link
                href="/help"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                Supporto
              </Link>
              <Link
                href="/privacy"
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                Privacy Policy
              </Link>
            </Box>
          </Box>

          {/* Social Media */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Seguici
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  onClick={() => handleSocialClick(social.url)}
                  aria-label={social.label}
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Copyright fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {currentYear} EventIMS. Tutti i diritti riservati.
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Versione 1.0.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

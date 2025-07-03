import React from "react";
import { 
  IconButton, 
  Avatar, 
  Badge,
  Tooltip,
  useTheme,
  alpha 
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled IconButton per posizionamento fisso
const StyledIconButton = styled(IconButton)(({ theme, variant }) => ({
  position: "fixed",
  right: 35,
  top: 12.5,
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  width: 40,
  height: 40,
  zIndex: theme.zIndex.appBar - 1,
  boxShadow: theme.shadows[2],
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: theme.transitions.create([
    'transform',
    'box-shadow',
    'background-color'
  ], {
    duration: theme.transitions.duration.short,
  }),
  
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
  
  '&:active': {
    transform: 'scale(0.95)',
  },
  
  // Variante circle
  ...(variant === 'circle' && {
    padding: 2,
    '& .MuiAvatar-root': {
      width: 36,
      height: 36,
    }
  }),
}));

const HeaderIcon = ({
  children,
  type = "normal", // normal, circle, badge
  onClick = () => {},
  sx = {},
  tooltip = "",
  badgeContent,
  badgeColor = "error",
  disabled = false,
  ariaLabel = "Header action button",
  size = "medium", // small, medium, large
}) => {
  const theme = useTheme();

  // Determina le dimensioni in base alla prop size
  const sizeMap = {
    small: { width: 32, height: 32, fontSize: '1rem' },
    medium: { width: 40, height: 40, fontSize: '1.3rem' },
    large: { width: 48, height: 48, fontSize: '1.5rem' }
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  // Renderizza il contenuto in base al tipo
  const renderContent = () => {
    switch (type) {
      case "circle":
        return (
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: currentSize.width - 4,
              height: currentSize.height - 4,
              fontSize: currentSize.fontSize,
              fontWeight: 'bold',
            }}
          >
            {children}
          </Avatar>
        );
      
      case "badge":
        return (
          <Badge 
            badgeContent={badgeContent} 
            color={badgeColor}
            overlap="circular"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {children}
          </Badge>
        );
      
      default:
        return children;
    }
  };

  // Componente base
  const IconButtonComponent = (
    <StyledIconButton
      onClick={onClick}
      disabled={disabled}
      variant={type}
      aria-label={ariaLabel}
      sx={{
        width: currentSize.width,
        height: currentSize.height,
        fontSize: currentSize.fontSize,
        ...sx,
      }}
    >
      {renderContent()}
    </StyledIconButton>
  );

  // Wrappa con Tooltip se fornito
  if (tooltip) {
    return (
      <Tooltip 
        title={tooltip} 
        arrow 
        placement="left"
        enterDelay={500}
        leaveDelay={200}
      >
        <span>
          {IconButtonComponent}
        </span>
      </Tooltip>
    );
  }

  return IconButtonComponent;
};

export default HeaderIcon;

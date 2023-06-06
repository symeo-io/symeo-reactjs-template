import { createTheme } from "@mui/material";
import { colors } from "./colors";

export const SIDE_BAR_WIDTH = 260;

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      contrastText: "#FFFFFF",
      ...colors.primary,
    },
    secondary: {
      contrastText: "#FFFFFF",
      ...colors.secondary,
    },
    error: {
      ...colors.error,
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "4px",
          padding: "8px 12px",
          fontSize: "0.875rem",
          lineHeight: "100%",
          fontWeight: 600,
        },
        containedPrimary: {
          background: colors.primary.main,

          "&:hover": {
            background: colors.primary[700],
          },

          "&:active": {
            background: colors.primary[750],
            outline: `4px solid rgba(15, 111, 201, 0.3)`,
          },

          "&.Mui-disabled": {
            background: colors.secondary.surface,
            color: colors.secondary.light,
          },
        },
        containedSecondary: {
          background: colors.primary.surface,
          color: colors.primary.main,

          "&:hover": {
            background: colors.primary.surfaceHover,
            color: colors.primary.textHover,
          },

          "&:active": {
            background: colors.primary.surface,
            color: colors.primary.textHover,
            outline: `4px solid rgba(15, 111, 201, 0.3)`,
          },

          "&.Mui-disabled": {
            background: colors.secondary.surface,
            color: colors.secondary.light,
          },
        },
        outlined: {
          background: "white",
          border: `1px solid ${colors.secondary.borders}`,
          color: colors.secondary.main,

          "&:hover": {
            background: colors.secondary.surfaceHover,
            border: `1px solid ${colors.secondary.borders}`,
            color: colors.secondary.main,
          },

          "&:active": {
            background: "white",
            border: `1px solid ${colors.secondary.borders}`,
            color: colors.secondary.main,
            outline: `4px solid rgba(15, 111, 201, 0.3)`,
          },

          "&.Mui-disabled": {
            background: colors.secondary.surface,
            color: colors.secondary.light,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        variant: "contained",
        disableFocusRipple: true,
      },
    },
  },
});

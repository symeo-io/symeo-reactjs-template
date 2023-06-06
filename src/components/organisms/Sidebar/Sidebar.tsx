import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { SIDE_BAR_WIDTH } from "theme/theme";
import { colors } from "theme/colors";
import { useIntl } from "react-intl";
import InternalLink from "components/atoms/InternalLink/InternalLink";
import { useAuth } from "oidc-react";

function Sidebar() {
  const intl = useIntl();
  const { signOut } = useAuth();

  return (
    <Drawer
      sx={{
        width: `${SIDE_BAR_WIDTH}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${SIDE_BAR_WIDTH}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          border: 0,
          borderRight: `1px solid ${colors.secondary.borders}`,
          padding: (theme) => theme.spacing(2),
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography variant="h2">
        {intl.formatMessage({ id: "sidebar.title" })}
      </Typography>
      <Box sx={{ marginTop: (theme) => theme.spacing(3), flex: 1 }}>
        <InternalLink to="home">
          {intl.formatMessage({ id: "sidebar.links.home-link-label" })}
        </InternalLink>
      </Box>
      <Button onClick={signOut}>
        {intl.formatMessage({ id: "sidebar.logout-button-label" })}
      </Button>
    </Drawer>
  );
}

export default Sidebar;

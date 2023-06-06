import { Box, Card, Typography } from "@mui/material";
import LoginWithGoogleButton from "components/molecule/LoginWithGoogleButton/LoginWithGoogleButton";
import { useAuth } from "oidc-react";
import { Navigate } from "react-router-dom";
import React from "react";
import { useIntl } from "react-intl";

function Login() {
  const { userData, isLoading } = useAuth();
  const intl = useIntl();

  if (!isLoading && userData) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          padding: (theme) => theme.spacing(2),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        elevation={3}
      >
        <Typography variant="h4">
          {intl.formatMessage({ id: "login.title" })}
        </Typography>
        <LoginWithGoogleButton sx={{ marginTop: (theme) => theme.spacing(3) }}>
          {intl.formatMessage({ id: "login.login-with-google-button-label" })}
        </LoginWithGoogleButton>
      </Card>
    </Box>
  );
}

export default Login;

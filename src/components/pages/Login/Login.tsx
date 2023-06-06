import { Card, Typography } from "@mui/material";
import LoginWithGoogleButton from "components/molecule/LoginWithGoogleButton/LoginWithGoogleButton";
import { useAuth } from "oidc-react";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import PageTemplate from "components/templates/PageTemplate";
import { useNavigate } from "hooks/useNavigate";

function Login() {
  const { userData, isLoading } = useAuth();
  const intl = useIntl();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && userData) {
      navigate("home");
    }
  }, [isLoading, navigate, userData]);

  return (
    <PageTemplate
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
    </PageTemplate>
  );
}

export default Login;

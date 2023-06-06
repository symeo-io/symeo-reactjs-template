import React from "react";
import { useAuth } from "oidc-react";
import { useNavigate } from "hooks/useNavigate";

export type AuthenticatedRouteProps = {
  component: React.ComponentType<object>;
};

function AuthenticatedRoute({ component }: AuthenticatedRouteProps) {
  const { userData, isLoading } = useAuth();
  const navigate = useNavigate();
  const Component = component;

  if (!isLoading && !userData) {
    return navigate("login");
  }

  return <Component />;
}

export default AuthenticatedRoute;

import React from "react";
import { useAuth } from "oidc-react";
import { Navigate } from "react-router-dom";

export type AuthenticatedRouteProps = {
  component: React.ComponentType<object>;
};

function AuthenticatedRoute({ component }: AuthenticatedRouteProps) {
  const { userData, isLoading } = useAuth();
  const Component = component;

  if (!isLoading && !userData) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Component />;
}

export default AuthenticatedRoute;

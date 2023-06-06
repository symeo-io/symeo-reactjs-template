import React, { useEffect } from "react";
import { useAuth } from "oidc-react";
import { useNavigate } from "hooks/useNavigate";

export type AuthenticatedRouteProps = {
  component: React.ComponentType<object>;
};

function AuthenticatedRoute({ component }: AuthenticatedRouteProps) {
  const { userData, isLoading } = useAuth();
  const navigate = useNavigate();
  const Component = component;

  useEffect(() => {
    if (!isLoading && !userData) {
      navigate("login");
    }
  }, [isLoading, navigate, userData]);

  return <Component />;
}

export default AuthenticatedRoute;

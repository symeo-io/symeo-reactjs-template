import { PropsWithSx } from "types/PropsWithSx";
import { Button } from "@mui/material";
import { useAuth } from "oidc-react";
import { PropsWithChildren, useCallback } from "react";

export type LoginWithGoogleButtonProps = PropsWithSx & PropsWithChildren;

function LoginWithGoogleButton({ sx, children }: LoginWithGoogleButtonProps) {
  const { signIn } = useAuth();
  const handleSignInButtonClick = useCallback(() => signIn(), [signIn]);

  return (
    <Button
      sx={{ ...sx }}
      variant="contained"
      onClick={handleSignInButtonClick}
    >
      {children}
    </Button>
  );
}

export default LoginWithGoogleButton;

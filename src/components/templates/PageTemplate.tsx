import { PropsWithSx } from "types/PropsWithSx";
import { PropsWithChildren } from "react";
import { Box } from "@mui/material";

export type PageTemplateProps = PropsWithSx & PropsWithChildren;

function PageTemplate({ sx, children }: PageTemplateProps) {
  return (
    <Box component="main" sx={{ padding: (theme) => theme.spacing(2), ...sx }}>
      {children}
    </Box>
  );
}

export default PageTemplate;

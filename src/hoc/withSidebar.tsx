import React from "react";
import { Box } from "@mui/material";
import Sidebar from "components/organisms/Sidebar/Sidebar";

export function withSidebar(WrappedComponent: React.ComponentType): React.FC {
  return function (props) {
    return (
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <WrappedComponent {...props} />
        </Box>
      </Box>
    );
  };
}

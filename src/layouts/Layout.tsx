import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import MinisideBar from "../components/MinisideBar";

const Layout: React.FC<{ children: React.ReactNode; panel: JSX.Element }> = ({
  children,
  panel,
}) => {
  return (
    <Grid
      gridTemplateColumns={{ base: "64px 1fr", xl: "64px 1fr 340px" }}
      h="100vh"
      overflow="hidden"
    >
      <MinisideBar />

      {children}

      <Box display={{ base: "none", xl: "block" }} h="full" p={0}>
        {panel}
      </Box>
    </Grid>
  );
};

export default Layout;

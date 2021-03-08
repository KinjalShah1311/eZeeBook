import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import Footer from "./Footer";
import { AuthContext } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthContext.Provider
      value={{
        authenticated: true,
        email: "",
        password: ""
      }}
    >
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App v4-beta example with TypeScript
          </Typography>
          <ProTip />
          <Footer />
        </Box>
      </Container>
    </AuthContext.Provider>
  );
}

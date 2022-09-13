import * as React from "react";
import { CircularProgress, Container } from "@mui/material/";

export default function Loader() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40rem",
      }}
    >
      <CircularProgress color="secondary" />
    </Container>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <Container maxWidth="xl">
          <h1>Front-end test</h1>
        </Container>
      </div>
      <Outlet />
    </>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1>Front-end test</h1>
      </div>
      <Outlet />
    </>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <h1>Front-end test</h1>
      <Outlet />
    </div>
  );
}

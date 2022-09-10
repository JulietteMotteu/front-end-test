import React, { Component } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./Table.css";

import { Link } from "react-router-dom";
import data from "../../data.json";

const fields = Object.keys(Object.assign({}, ...data));
const columnsFields = fields.slice(0, 4);

const columns = columnsFields.map((field) => {
  let column = {
    field: field,
    headername: field === "id" ? "ID" : field,
    width: field === "description" ? 300 : 150,
    renderCell: (params) => (
      <Link to={`/${params.row.id}`}>{params.value}</Link>
    ),
  };
  return column;
});

const rows = data.map((item) => {
  let entries = Object.entries(item).filter((cur) =>
    columnsFields.includes(cur[0])
  );
  return Object.fromEntries(entries);
});

const handleOpen = () => {
  console.log("test");
};

export default function Table() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={handleOpen}
      />
    </Box>
  );
}

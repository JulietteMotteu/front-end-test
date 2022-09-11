import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./Table.css";

import { Link } from "react-router-dom";
import data from "../../data.json";

// Get columns fieldsName
const fields = Object.keys(Object.assign({}, ...data));
const columnsFields = fields.slice(0, 4);

// Create columns to display in data-grid
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

// Select rows data corresponding the columns to display in data-grid
const rows = data.map((item) => {
  let entries = Object.entries(item).filter((cur) =>
    columnsFields.includes(cur[0])
  );
  return Object.fromEntries(entries);
});

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }
  // let { selectedId } = props;

  // const handleRedirection = (params) => {
  //   selectedId = params.row.id;
  // };

  render() {
    return (
      <Box sx={{ height: 400, width: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          // onRowClick={(itm) => handleRedirection(itm)}
        />
      </Box>
    );
  }
}

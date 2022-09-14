import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Table.css";

export default function Table() {
  // Get products data from the store
  const products = useSelector(
    (state) => state.productsStore.displayedProducts
  );

  // Define columns properties
  const columnsFields = [
    { fieldName: "id", headerName: "ID", width: "100" },
    { fieldName: "name", headerName: "Title", width: "400" },
    { fieldName: "price", headerName: "Price", width: "200" },
    {
      fieldName: "ean",
      headerName: "EAN code",
      width: "auto",
      flex: 1,
    },
  ];

  // Get columns fieldsName
  const fieldNames = columnsFields.map((field) => {
    if (Object.keys(field).includes("headerName")) {
      return field.fieldName;
    }
  });

  // Create columns to display in data-grid
  const columns = columnsFields.map((field) => {
    let column = {
      field: field.fieldName,
      headerName: field.headerName,
      width: field.width,
      flex: field.flex ? field.flex : 0,
      renderCell: (params) => (
        <Link to={`product/${params.row.id}`}>{params.value}</Link>
      ),
    };
    return column;
  });

  // Select rows data corresponding the columns to display in data-grid
  const rows = products.map((item) => {
    let entries = Object.entries(item).filter((cur) =>
      fieldNames.includes(cur[0])
    );
    return Object.fromEntries(entries);
  });

  return (
    <Container className="data-table">
      <Typography gutterBottom variant="h4" component="h2">
        <span className="colored-text">Products </span> datatable
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Table that displays data concerning products.
        <br /> Click on a product to see full product details
      </Typography>
      <Box sx={{ height: 350, width: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
          autoHeight
          hideFooter={true}
        />
      </Box>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import {
  setProductsData,
  setSelectedProductId,
} from "../../features/products.slice";
import axios from "../../api/axios";
import "./Table.css";

export default function Table() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsStore.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setSelectedProductId(null));
    const getProducts = async () => {
      const response = await axios.get("/products");
      setLoading(false);
      const { data } = response;
      dispatch(setProductsData(data));
      return data;
    };
    getProducts().catch(console.error);
  }, []);

  const columnsFields = [
    { fieldName: "ID", headerName: "id", width: "50" },
    { fieldName: "Title", headerName: "title", width: "200" },
    { fieldName: "Price", headerName: "price", width: "100" },
    { fieldName: "Description", headerName: "description", width: "300" },
  ];
  const headerNames = columnsFields.map((field) => {
    if (Object.keys(field).includes("headerName")) {
      return field.headerName;
    }
  });

  if (!loading) {
    // Get columns fieldsName
    const fields = Object.keys(Object.assign({}, ...products));
    // const columnsFields = fields.slice(0, 4);

    // Create columns to display in data-grid
    const columns = columnsFields.map((field) => {
      let column = {
        field: field.fieldName,
        headerName: field.headerName,
        width: field.width,
        renderCell: (params) => (
          <Link to={`/${params.row.id}`}>{params.value}</Link>
        ),
      };
      return column;
    });

    // Select rows data corresponding the columns to display in data-grid
    const rows = products.map((item) => {
      let entries = Object.entries(item).filter((cur) =>
        headerNames.includes(cur[0])
      );
      return Object.fromEntries(entries);
    });

    console.log(rows);
    console.log(columns);
    console.log(headerNames);

    const handleRedirection = (params) => {
      dispatch(setSelectedProductId(params.row.id));
    };

    return (
      <Container>
        <Typography gutterBottom variant="h4" component="h2">
          <span className="colored-text">Datatable </span> random users
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Table that displays data concerning random users
        </Typography>
        <Box sx={{ height: 400, width: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            onRowClick={(itm) => handleRedirection(itm)}
          />
        </Box>
      </Container>
    );
  }
}

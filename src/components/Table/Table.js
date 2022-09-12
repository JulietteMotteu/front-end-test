import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Container } from "@mui/material";
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
      const response = await axios.get("products");
      setLoading(false);
      const { data } = response;
      dispatch(setProductsData(data));
      return data;
    };
    getProducts().catch(console.error);
  }, []);

  if (!loading) {
    // Get columns fieldsName
    const columnsFields = [
      { fieldName: "id", headerName: "ID", width: "50" },
      { fieldName: "title", headerName: "Title", width: "500" },
      { fieldName: "price", headerName: "Price", width: "100" },
      { fieldName: "category", headerName: "Category", width: "150" },
    ];
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
        renderCell: (params) => (
          <Link to={`/${params.row.id}`}>{params.value}</Link>
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

    const handleRedirection = (params) => {
      dispatch(setSelectedProductId(params.row.id));
    };

    return (
      <Container>
        <Typography gutterBottom variant="h4" component="h2">
          <span className="colored-text">Datatable </span> random users
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Table that displays data concerning products.
          <br /> Click on a product to see full product details
        </Typography>
        <Box sx={{ height: 400, width: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
            onRowClick={(itm) => handleRedirection(itm)}
          />
        </Box>
      </Container>
    );
  }
}

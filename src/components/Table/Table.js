import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  if (!loading) {
    // Get columns fieldsName
    const fields = Object.keys(Object.assign({}, ...products));
    const columnsFields = fields.slice(0, 4);

    // Create columns to display in data-grid
    const columns = columnsFields.map((field) => {
      let column = {
        field: field === "id" ? "ID" : field,
        headername: field,
        width: field === "description" ? 1000 : 150,
        renderCell: (params) => (
          <Link to={`/${params.row.id}`}>{params.value}</Link>
        ),
      };
      return column;
    });

    // Select rows data corresponding the columns to display in data-grid
    const rows = products.map((item) => {
      let entries = Object.entries(item).filter((cur) =>
        columnsFields.includes(cur[0])
      );
      return Object.fromEntries(entries);
    });

    const handleRedirection = (params) => {
      dispatch(setSelectedProductId(params.row.id));
    };

    return (
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
    );
  }
}

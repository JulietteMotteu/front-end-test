import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { Container } from "@mui/material/";
import { setDisplayedProducts } from "../../features/products.slice";
import "./TablePagination.css";

export default function TablePagination() {
  const dispatch = useDispatch();
  // Set default page number
  const [page, setPage] = useState(1);

  // Get products from the store
  const products = useSelector((state) => state.productsStore.products);

  // Calculate number of pages to display
  const count = Math.ceil(products.length / 5);

  // Function that handles page change and set products to display matching the page in the store
  const handleChange = (event, value) => {
    setPage(value);
    const displayedProducts = { products, value };
    dispatch(setDisplayedProducts(displayedProducts));
  };

  return (
    <Container className="table-pagination">
      <Pagination
        count={count}
        page={page}
        color="secondary"
        variant="outlined"
        onChange={handleChange}
      />
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table/Table";
import TablePagination from "../components/TablePagination/TablePagination";
import Loader from "../components/Loader/Loader";
import {
  setProductsData,
  setDisplayedProducts,
} from "../features/products.slice";
import axios from "../api/axios";

export default function HomePage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const products = useSelector(
    (state) => state.productsStore.displayedProducts
  );

  useEffect(() => {
    // Fetch products from api
    const getProducts = async () => {
      const response = await axios.get("products");
      const { data } = response;

      // Set loader to false after fetching products
      setLoading(false);

      // Set products store with data from api
      dispatch(setProductsData(data));
      if (products === null) {
        dispatch(setDisplayedProducts({ products: data, value: 1 }));
      }
      return data;
    };
    getProducts().catch(console.error);
  }, []);

  if (!loading) {
    return (
      <>
        <Table />
        <TablePagination />
      </>
    );
  } else {
    return <Loader />;
  }
}

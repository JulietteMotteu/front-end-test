import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProductsData } from "./features/products.slice";
import Header from "./components/Header/Header";
import ProductPage from "./pages/Product";
import HomePage from "./pages/Home";
import axios from "./api/axios";
import "./App.css";

let id = 1;

// Router
const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("/products");
      const { data } = response;
      dispatch(setProductsData(data));
      return data;
    };
    getProducts().catch(console.error);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<HomePage />} />
        <Route path={`/${id}`} element={<ProductPage id={id} />} />
      </Route>
    </Routes>
  );
};

export default App;

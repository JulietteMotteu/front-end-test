import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import ProductPage from "./pages/Product";
import HomePage from "./pages/Home";
import "./App.css";

const App = () => {
  const selectedProductId = useSelector(
    (state) => state.productsStore.productId
  );

  return (
    // Router
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<HomePage />} />
        <Route path={`/${selectedProductId}`} element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;

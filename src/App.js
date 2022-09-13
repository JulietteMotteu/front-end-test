import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductPage from "./pages/Product";
import HomePage from "./pages/Home";
import "./App.css";

const App = () => {
  return (
    // Router
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;

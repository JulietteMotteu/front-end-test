import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductPage from "./pages/Product";
import HomePage from "./pages/Home";
import "./App.css";

let id = 1;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<HomePage />} />
        <Route path={`/${id}`} element={<ProductPage id={id} />} />
      </Route>
    </Routes>
  );
}

export default App;

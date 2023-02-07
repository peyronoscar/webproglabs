import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import inventory from "./inventory.ES6";
import ComposeSalad from "./components/ComposeSalad";
import { useState } from "react";
import ViewOrder from "./components/ViewOrder";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFound from "./components/404";
import ViewIngredient from "./components/ViewIngredient";

const App = () => {
  const [order, setOrder] = useState([]);

  return (
    <div className="container py-4">
      <Header />
      <Navbar />

      <main className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/compose-salad"
              element={
                <ComposeSalad inventory={inventory} setOrder={setOrder} />
              }
            />
            <Route
              path="/view-order"
              element={<ViewOrder order={order} setOrder={setOrder} />}
            />
            <Route
              path="/view-ingredient/:name"
              element={<ViewIngredient inventory={inventory} />}
            />
            <Route path="/*" element={NotFound} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;

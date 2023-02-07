import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ComposeSalad from "./components/ComposeSalad";
import { useState, useEffect } from "react";
import ViewOrder from "./components/ViewOrder";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFound from "./components/404";
import ViewIngredient from "./components/ViewIngredient";
import Spinner from "./components/Spinner";
import Toast from "./components/Toast";
import { Salad } from "./Salad";
import { fetchInventory } from "./utils/inventory";

const App = () => {
  const [order, setOrder] = useState([]);
  const [inventory, setInventory] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Fetch ingredients
    const controller = new AbortController();

    fetchInventory(controller).then((inventory) => setInventory(inventory));

    // Update orders from localStorage
    const clientSaladsJson = JSON.parse(localStorage.getItem("orders")) || [];
    const clientSalads = clientSaladsJson.map((order) => new Salad(order));

    setOrder(clientSalads);

    return () => {
      controller.abort();
    };
  }, []);

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
                inventory ? (
                  <ComposeSalad
                    inventory={inventory}
                    setOrder={setOrder}
                    setShowToast={setShowToast}
                  />
                ) : (
                  <Spinner />
                )
              }
            />
            <Route
              path="/view-order"
              element={<ViewOrder order={order} setOrder={setOrder} />}
            />
            <Route
              path="/view-ingredient/:name"
              element={
                inventory ? (
                  <ViewIngredient inventory={inventory} />
                ) : (
                  <Spinner />
                )
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Toast show={showToast} setShow={setShowToast} />
      <Footer />
    </div>
  );
};

export default App;

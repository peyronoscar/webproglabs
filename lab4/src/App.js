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
import { safeFetchJson } from "./utils/safeFetchJson";

const App = () => {
  const [order, setOrder] = useState([]);
  const [ordered, setOrdered] = useState([]);
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

    const clientOrderedJson = JSON.parse(localStorage.getItem("ordered")) || [];
    setOrdered(clientOrderedJson);

    return () => {
      controller.abort();
    };
  }, []);

  const addToOrder = ({ foundation, protein, dressing, extras }) => {
    const salad = new Salad({
      ingredients: {
        [foundation]: inventory[foundation],
        [protein]: inventory[protein],
        [dressing]: inventory[dressing],
        ...extras,
      },
    });

    const clientSalads = JSON.parse(localStorage.getItem("orders")) || [];
    clientSalads.push(salad);
    localStorage.setItem("orders", JSON.stringify(clientSalads));

    setOrder((oldState) => [...oldState, salad]);
  };

  const removeFromOrder = (uuid) => {
    if (Array.isArray(uuid)) {
      return uuid.forEach((id) => removeFromOrder(id));
    }

    setOrder((oldState) => oldState.filter((item) => item.uuid !== uuid));

    const clientSalads = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify(clientSalads.filter((salad) => salad.uuid !== uuid))
    );
  };

  const buyOrder = async () => {
    const confirmation = await safeFetchJson("http://localhost:8080/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order.map((item) => Object.keys(item.ingredients))),
    });

    const clientOrders = JSON.parse(localStorage.getItem("ordered")) || [];
    clientOrders.push(confirmation);
    localStorage.setItem("ordered", JSON.stringify(clientOrders));

    setOrdered((oldState) => [...oldState, confirmation]);

    removeFromOrder(order.map((item) => item.uuid));
  };

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
                    addToOrder={addToOrder}
                    setShowToast={setShowToast}
                  />
                ) : (
                  <Spinner />
                )
              }
            />
            <Route
              path="/view-order"
              element={
                <ViewOrder
                  order={order}
                  ordered={ordered}
                  buyOrder={buyOrder}
                  removeFromOrder={removeFromOrder}
                />
              }
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

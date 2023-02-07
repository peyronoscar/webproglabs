import React from "react";

const ViewOrder = ({ order, ordered, removeFromOrder, buyOrder }) => {
  const handleClick = (uuid) => {
    removeFromOrder(uuid);
  };

  console.log(ordered);

  const handleSubmit = async (e) => {
    e.preventDefault();

    buyOrder();
  };

  return (
    <>
      <h1>Beställningar</h1>
      {order.length > 0 ? (
        <form onSubmit={handleSubmit} noValidate>
          <h2>Din pågående beställning</h2>
          <ul className="list-group">
            {order.map((salad) => {
              return (
                <li key={salad.uuid} className="list-group-item">
                  <p className="mb-0">
                    {Object.keys(salad.ingredients).join(", ")}
                  </p>
                  <p>Pris: {salad.getPrice()} kr</p>
                  <div>
                    <button
                      onClick={() => handleClick(salad.uuid)}
                      className="btn btn-danger"
                    >
                      Ta bort
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <button type="submit" className="btn btn-primary mt-3">
            Skicka beställning
          </button>
        </form>
      ) : null}

      {ordered.length > 0 ? (
        <div className={order.length > 0 ? "mt-5" : undefined}>
          <h2>Dina tidigare beställningar</h2>
          <ul className="list-group">
            {ordered.map((order) => {
              return (
                <li key={order.timestamp} className="list-group-item">
                  <h3>Orderbekräftelse</h3>
                  <p>Status: {order.status}</p>
                  <p>Ordernummer: {order.uuid}</p>
                  <p>Tid: {order.timestamp}</p>
                  <p>Antal sallader: {order.order.length}</p>
                  <p>Pris: {order.price} kr</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default ViewOrder;

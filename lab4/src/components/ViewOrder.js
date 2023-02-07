import React from "react";

const ViewOrder = ({ order, setOrder }) => {
  const handleClick = (uuid) => {
    setOrder((oldState) => oldState.filter((item) => item.uuid !== uuid));

    const clientSalads = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify(clientSalads.filter((salad) => salad.uuid !== uuid))
    );
  };

  return (
    <>
      <h1>Din beställning</h1>
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
    </>
  );
};

export default ViewOrder;

import React from "react";

const ViewOrder = ({ order, setOrder }) => {
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
                  onClick={() =>
                    setOrder((oldState) =>
                      oldState.filter((item) => item.uuid !== salad.uuid)
                    )
                  }
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

import React from "react";

const ViewOrder = ({ order, setOrder }) => {
  if (order.length === 0) return null;

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Din beställning</h2>
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
      </div>
    </div>
  );
};

export default ViewOrder;

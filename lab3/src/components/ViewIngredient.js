import React from "react";
import { useParams } from "react-router-dom";

const ViewIngredient = ({ inventory }) => {
  const { name } = useParams();

  console.log();

  return (
    <>
      <h1>{name}</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <p className="mb-0">Pris: {inventory[name].price} kr</p>
        </li>
        {Object.entries(inventory[name]).map(([key, value]) => {
          if (key === "price" || !value) return null;

          return (
            <li key={key} className="list-group-item">
              <p className="mb-0 text-capitalize">{key}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ViewIngredient;

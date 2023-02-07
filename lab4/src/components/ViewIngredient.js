import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewIngredient = ({ inventory }) => {
  const { name } = useParams();
  const navigate = useNavigate();

  // If ingredient doesn't exists, send user to 404 page.
  useEffect(() => {
    if (!inventory[name]) navigate("/404");
  }, [navigate, inventory, name]);

  if (!inventory[name]) return null;

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

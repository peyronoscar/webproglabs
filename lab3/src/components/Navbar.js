import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Hem
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/compose-salad">
            Komponera en sallad
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/view-order">
            Visa din beställning
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/other-stuff">
            Other stuff
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

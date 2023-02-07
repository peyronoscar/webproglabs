import React from "react";
import { Link } from "react-router-dom";

const SaladSelect = ({ options, onChange, name, current, required }) => {
  return (
    <div className="col-12 form-group mb-3">
      <label>
        Välj {name}
        <select
          onChange={onChange}
          name={name}
          className="form-control"
          value={current}
          required={required}
        >
          <option value="" disabled={true}>
            gör ditt val
          </option>
          {options.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Obligatoriskt</div>
      </label>
      {current ? (
        <Link
          className="btn btn-secondary mx-2"
          to={`/view-ingredient/${current}`}
        >
          Information
        </Link>
      ) : null}
    </div>
  );
};

export default SaladSelect;

import React from "react";
import { Link } from "react-router-dom";

const SaladCheckbox = ({ options, onChange, name, current, error }) => {
  return (
    <div className="col-12 form-group mb-3">
      <label>Välj {name}</label>
      <div className="row">
        {options.map((name, i) => (
          <div
            className="form-check col-12 col-sm-6 col-md-4 col-lg-3"
            key={name}
          >
            <input
              value={name}
              type="checkbox"
              name={name}
              onChange={onChange}
              checked={current.includes(name)}
              className="form-check-input"
              id={`form-check-input-${name}`}
            />
            <label htmlFor={`form-check-input-${name}`}>
              <Link
                to={`/view-ingredient/${encodeURIComponent(name)}`}
                className="link-secondary"
              >
                {name}
              </Link>
            </label>
          </div>
        ))}
      </div>
      <div>
        {error ? (
          <div className="alert alert-danger mt-3" role="alert">
            Välj minst 3 och högst 9 tillbehör.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SaladCheckbox;

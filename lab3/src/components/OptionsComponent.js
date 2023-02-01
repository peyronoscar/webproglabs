import React from "react";
import { Link } from "react-router-dom";

const OptionsComponent = ({
  options,
  onChange,
  name,
  checkbox,
  current,
  required,
  error,
}) => {
  return (
    <div className="col-12 form-group mb-3">
      {!checkbox ? (
        <>
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
        </>
      ) : (
        <>
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
                    to={`/view-ingredient/${name}`}
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
        </>
      )}
    </div>
  );
};

export default OptionsComponent;

import React from "react";

const OptionsComponent = ({ options, onChange, name, checkbox, current }) => {
  return (
    <div className="col-12 form-group mb-3">
      {!checkbox ? (
        <label>
          Välj {name}
          <select
            onChange={onChange}
            name={name}
            className="form-control"
            value={current}
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
        </label>
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
                <label htmlFor={`form-check-input-${name}`}>{name}</label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OptionsComponent;

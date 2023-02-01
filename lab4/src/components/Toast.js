import React from "react";

const Toast = ({ show, setShow }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{ position: "relative", minHeight: 200 }}
    >
      <div style={{ position: "fixed", bottom: 20, right: 20 }}>
        <div
          className={`toast ${show ? "show" : null}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong>Bootstrap</strong>
            <small className="text-muted mx-auto">just now</small>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="toast"
              aria-label="Close"
              onClick={() => setShow(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">Ny salad skapad</div>
        </div>
      </div>
    </div>
  );
};

export default Toast;

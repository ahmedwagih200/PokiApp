import React from "react";
import "bulma/css/bulma.min.css";

const ErrorMessage = ({ message }) => (
  <p className="has-text-weight-bold has-text-danger">{message}</p>
);

export default ErrorMessage;
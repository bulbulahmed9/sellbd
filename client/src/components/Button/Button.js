import React from "react";

import "./Button.css";

const Button = ({ title }) => {
  return (
    <>
      <button className="title">{title}</button>
    </>
  );
};

export default Button;

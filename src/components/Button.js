import React from "react";

const Button = ({ type, className, content, openModal }) => {
  return (
    <button className={className} type={type} onClick={openModal}>
      {content}
    </button>
  );
};

export default Button;

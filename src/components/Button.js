import React from "react";

//This component was meant to be used more in future versions of the project. I believe I only used it once for the current iteration.

const Button = ({ type, className, content, openModal }) => {
  return (
    <button className={className} type={type} onClick={openModal}>
      {content}
    </button>
  );
};

export default Button;

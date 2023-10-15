import React from "react";

const Square = ({ value, onSquareClick, isRed, isDisabledRedline }) => {
  return (
    <button
      style={{ color: isRed && !isDisabledRedline ? "red" : "black" }}
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;

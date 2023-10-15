import React from "react";
import "./SquareStyle.css";
const Square = ({
  value,
  onSquareClick,
  isRed,
  isDisabledRedline,
  isCurrentMove,
}) => {
  let move = "square";
  if (isRed && !isDisabledRedline) {
    move = move + " red-line";
  } else if (isCurrentMove) {
    move = move + " current-square";
  }

  return (
    <button className={move} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
